import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { Service } from "@/models";
import { IServiceSchema } from "@/interfaces";

type Data =
  | {
      message: string;
    }
  | IServiceSchema[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    default:
      return res.status(400).json({ message: "Bad Request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const services = await Service.find()
    .select("title images description -_id")
    .lean();
  await db.disconnect();

  return res.status(200).json(services);
};