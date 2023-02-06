import { db } from ".";
import { Blog } from "@/models";
import { IBlogSchema } from "@/interfaces";

export const getBlogByTitle = async (
  title: string
): Promise<IBlogSchema | null> => {
  await db.connect();
  const blog = await Blog.findOne({ title }).lean();
  await db.disconnect();

  if (!blog) return null;

  return JSON.parse(JSON.stringify(blog));
};
