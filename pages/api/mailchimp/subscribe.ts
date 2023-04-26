import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { Subscribe } from "@/models";
import { ISubscribe } from "@/interfaces";
import mailchimp from "@mailchimp/mailchimp_marketing";

const API_KEY = process.env.MAILCHIMP_API_KEY;
const API_SERVER = process.env.MAILCHIMP_API_SERVER;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

type Data =
  | { message: string }
  | ISubscribe
  | ({ message: string } & { user: ISubscribe });

mailchimp.setConfig({
  apiKey: API_KEY,
  server: API_SERVER,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return subscribeOrUpdateUser(req, res);

    default:
      res.status(400).json({ message: "Bad Request" });
  }
}

const subscribeOrUpdateUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { email } = req.body as ISubscribe;

  if (!email || !email.length) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const responseGet = await mailchimp.lists.getListMember(
      `${AUDIENCE_ID}`,
      email
    );

    if (responseGet?.status === "subscribed") {
      return res.status(409).json({
        message: "Ya existe un usuario suscripto con ese nombre",
        response: responseGet,
      });
    }

    if (responseGet?.status === "unsubscribed") {
      const responseUpdate = await mailchimp.lists.updateListMember(
        `${AUDIENCE_ID}`,
        email,
        { status: "subscribed" }
      );
      updateSubscribeToDb();
      return res.status(200).json({
        message: "Usuario actualizado",
        user: responseUpdate,
      });
    }
  } catch {
    const responsePost = await mailchimp.lists.addListMember(`${AUDIENCE_ID}`, {
      email_address: email,
      status: "subscribed",
    });
    subscribeToDb(email);
    if (!responsePost) {
      return res.status(500).json("ERROR DE SERVIDOR");
    }
    return res.status(200).json(responsePost);
  }
};

const subscribeToDb = async (email: string) => {
  try {
    await db.connect();
    const userSubscribeInDB = await Subscribe.findOne({ email: email });

    if (userSubscribeInDB?.status === "subscribed") {
      await db.disconnect();
      return {
        message: "Ya existe un usuario suscripto con ese nombre",
      };
    }

    const userToSubscribe = new Subscribe({
      email,
      status: "subscribed",
    });
    await userToSubscribe.save();

    await db.disconnect();
  } catch (error) {
    console.log(error);
  }
};

export const updateSubscribeToDb = async () => {
  //@ts-ignore
  const listUserInMailchimp = await mailchimp.lists.getListMembersInfo(
    `${AUDIENCE_ID}`,
    { count: 1000 }
  );

  try {
    await db.connect();
    const listUserFromDB = await Subscribe.find();

    const usersMongo = listUserFromDB.map((eachMember: any) => {
      return {
        email: eachMember.email,
        status: eachMember.status,
      };
    });

    const usersMailchimp = listUserInMailchimp.members.map(
      (eachMember: any) => {
        return {
          email: eachMember.email_address,
          status: eachMember.status,
        };
      }
    );

    const assignedObjects = Object.assign(usersMongo, usersMailchimp);
    assignedObjects.map(async (eachObject: any) => {
      const userToSubscribe = Subscribe.updateOne(
        { email: eachObject.email },
        {
          $set: { status: eachObject.status },
        }
      );

      return userToSubscribe;
    });
    await db.disconnect();

    return assignedObjects;
  } catch (error) {
    await db.disconnect();
    console.log(error);
  }
};
