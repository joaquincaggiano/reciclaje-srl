import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import { db } from "@/database";
import { Product } from "@/models";
import { IProductSchema } from "../../../interfaces";

type Data = { message: string } | IProductSchema[] | IProductSchema;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    case "PUT":
      return updateProduct(req, res);

    default:
      return res.status(400).json({ message: "Bad Request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find().sort("asc").lean();
  await db.disconnect();

  res.status(200).json(products);
};

const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = "", images = [] } = req.body as IProductSchema;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "El ID del producto no es válido" });
  }

  if (images.length < 1) {
    return res
      .status(400)
      .json({ message: "Es necesario al menos una imagen" });
  }

  try {
    await db.connect();

    const productToUpdate = await Product.findById(_id);

    if (!productToUpdate) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "No existe un producto con ese ID" });
    }

    // toDo: eliminar las fotos del servidor donde las alojemos (AWS)

    await productToUpdate.update(req.body);
    await db.disconnect();

    return res.status(200).json(productToUpdate);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar la consola del servidor" });
  }
};
