import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { db } from "@/database";
import { Subscribe } from "@/models";
// import { validations } from "@/utils";

interface ISubscribe {
  email: string;
}
type Data = { message: string } | ISubscribe | { message: string } & {user: ISubscribe};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return onSubscribeUser(req, res);

    default:
      res.status(400).json({ message: "Bad Request" });
  }
}

const onSubscribeUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email } = req.body as ISubscribe;

  if (!email || !email.length /*|| !validations.isEmail(email)*/) {
    return res.status(400).json({ message: "Email is required" });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const API_SERVER = process.env.MAILCHIMP_API_SERVER;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const data = {
    email_address: email,
    status: "subscribed",
  };

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `api_key ${API_KEY}`,
    },
  };

  try {
    
    const response = await axios.post(url, data, options);
    
    if (response.status >= 400) {
      return res.status(400).json({
        message: `There was an error subscribing to the newsletter. Shoot me an email at joaquincaggiano@gmail and I'll add you to the list.`,
      });
    }

    await db.connect();
    const userSubscribeInDB = await Subscribe.findOne({ email: email });

    if (userSubscribeInDB) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "Ya existe un usuario suscripto con ese nombre" });
    }

    const userToSubscribe = new Subscribe(req.body);
    await userToSubscribe.save();

    await db.disconnect();

    return res.status(201).json({user: userToSubscribe, message: "success"});
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(400).json({ message: "Revisar la consola del servidor" });
    // return res.status(500).json({ message: error.message });
  }
};
