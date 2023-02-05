import { db } from ".";
import { Product } from "@/models";
import { IProductSchema } from "@/interfaces";

export const getProductByTitle = async (
  title: string
): Promise<IProductSchema | null> => {
  await db.connect();
  const product = await Product.findOne({ title }).lean();
  await db.disconnect();

  if (!product) {
    return null;
  }

  return JSON.parse(JSON.stringify(product));
};
