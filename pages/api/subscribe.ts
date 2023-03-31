import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { db } from "@/database";
import { Subscribe } from "@/models";
import { ISubscribe } from "@/interfaces";
import md5 from 'md5';
// import { validations } from "@/utils";

const API_KEY = process.env.MAILCHIMP_API_KEY;
const API_SERVER = process.env.MAILCHIMP_API_SERVER;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

type Data =
  | { message: string }
  | ISubscribe
  | ({ message: string } & { user: ISubscribe });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return subscribeOrUpdateUser(req, res);
    // case "POST":
    //   return onSubscribeUser(req, res);
    case "PUT":
      return updateSubscription(req, res);

    default:
      res.status(400).json({ message: "Bad Request" });
  }
}

const subscribeOrUpdateUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  console.log("ENTRE A LA FUNCION")
  const { email } = req.body as ISubscribe;

  const data = {
    email: email,
    status: "subscribed",
  };

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `api_key ${API_KEY}`,
    },
  };

  if (!email || !email.length /*|| !validations.isEmail(email)*/) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    // const subscriberHash = md5(email.toLowerCase());
    // console.log("SUBSCRIBER HASH", subscriberHash);
  const urlForPost = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members?apikey=${API_KEY}`;
    const urlForGet = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${email}?apikey=${API_KEY}`;
    // return subscriberHash
    const userInAudience = await axios.get(urlForGet)
    //@ts-ignore
    if (userInAudience?.status === "unsubscribed"){
      return "Hay que resuscribir al usuario"
    //@ts-ignore
    } else if (userInAudience?.status === "subscribed") {
      return "User already subscribed"
    } else {
      const userToSubscribe = await axios.post(urlForPost, data, options )
      await db.connect();
      const userSubscribeInDB = await Subscribe.findOne({ email: email });
      
      if (userSubscribeInDB?.status === "subscribed") {
        console.log("USER SUBSCRIBED", userSubscribeInDB)
        await db.disconnect();
        return res
          .status(400)
          .json({ message: "Ya existe un usuario suscripto con ese nombre" });
      }
  
      const userToDB = new Subscribe(data);
      await userToDB.save();
  
      await db.disconnect();
  
      return res.status(201).json({ user: userToDB, message: "success" });
      // return userToSubscribe
    }

  } catch(error) {
    console.log(error)
  }
  // El llamado a la url nos devuelve un array de members, el cual cada miembro nos importa el "status" y el "email_address"

  // axios.get(url)
  // verificar su status, para hacer un post o un put
  // En el post debería agregarlo a mailchimp y a la base de datos
  // En el put debería actualizar el status del mailchimp y de la base de datos
}

const onSubscribeUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email } = req.body as ISubscribe;

  if (!email || !email.length /*|| !validations.isEmail(email)*/) {
    return res.status(400).json({ message: "Email is required" });
  }
  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members?apikey=${API_KEY}`;

  const data = {
    email: email,
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
    
    if (userSubscribeInDB?.status === "subscribed") {
      console.log("USER SUBSCRIBED", userSubscribeInDB)
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "Ya existe un usuario suscripto con ese nombre" });
    }

    const userToSubscribe = new Subscribe(data);
    await userToSubscribe.save();

    await db.disconnect();

    return res.status(201).json({ user: userToSubscribe, message: "success" });
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(400).json({ message: "Revisar la consola del servidor" });
    // return res.status(500).json({ message: error.message });
  }
};

const updateSubscription = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email } = req.body as {email: string};

  try {
    // Busca al usuario en Mailchimp por correo electrónico
    const subscriberHash = md5(email.toLowerCase());
    const response = await axios.get(
      `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `apikey:${API_KEY}`
          ).toString("base64")}`,
        },
      }
    );
    const subscriberData = response.data;

    // Actualiza el estado de suscripción del usuario a "subscribed"
    await axios.put(
      `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}`,
      {
        status: "subscribed",
        email_address: email.toLowerCase(),
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `apikey:${API_KEY}`
          ).toString("base64")}`,
        },
      }
    );

    res
      .status(200)
      .json({
        message: `El usuario con correo electrónico ${email} ha sido suscrito nuevamente.`,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al intentar suscribir al usuario." });
  }
};
