import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { Product, Service, Blog, Subscribe } from "@/models";

type Data = {
  numbersOfProducts: number;
  numbersOfServices: number;
  numbersOfBlogs: number;
  numbersOfSubscribes: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();

  const [numbersOfProducts, numbersOfServices, numbersOfBlogs, numbersOfSubscribes] =
    await Promise.all([Product.count(), Service.count(), Blog.count(), Subscribe.count()]);

  await db.disconnect();

  res
    .status(200)
    .json({ numbersOfProducts, numbersOfServices, numbersOfBlogs, numbersOfSubscribes });
}
