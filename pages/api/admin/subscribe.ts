import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { Subscribe } from "@/models";
import { ISubscribe } from "@/interfaces";

type Data =
  | {
      message: string;
    }
  | ISubscribe
  | ISubscribe[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getSubscribes(req, res);

    default:
      return res.status(400).json({ message: "Bad Request" });
  }
}

const getSubscribes = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();
  const subscribes = await Subscribe.find().sort("asc").lean();
  await db.disconnect();

  res.status(200).json(subscribes);
};
