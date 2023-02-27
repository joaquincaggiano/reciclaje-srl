import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { validations } from "@/utils";

type Data = {
  message: string;
};

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
  const { email } = req.body;

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
    return res.status(201).json({ message: "success" });
  } catch (error) {
    console.log(error);
    // return res.status(500).json({ message: error.message });
  }
};
