import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { Blog } from "@/models";
import { IBlogSchema } from "@/interfaces";

type Data =
  | {
      message: string;
    }
  | IBlogSchema[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getBlogs(req, res);
    default:
      return res.status(400).json({ message: "Bad Request" });
  }
}

const getBlogs = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const blogs = await Blog.find()
    .select("title images description info -_id")
    .lean();
  await db.disconnect();

  return res.status(200).json(blogs);
};