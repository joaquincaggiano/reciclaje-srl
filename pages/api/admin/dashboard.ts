import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { Product, Service, Blog } from "@/models";

type Data = {
  numbersOfProducts: number;
  numbersOfServices: number;
  numbersOfBlogs: number;
  // numbersOfUsers: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();

  const [numbersOfProducts, numbersOfServices, numbersOfBlogs] =
    await Promise.all([Product.count(), Service.count(), Blog.count()]);

  await db.disconnect();

  res.status(200).json({numbersOfProducts, numbersOfServices, numbersOfBlogs})
}
