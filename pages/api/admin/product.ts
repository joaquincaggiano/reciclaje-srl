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
    case "POST":
      return createProduct(req, res);
    case "DELETE":
      return deleteProduct(req, res)

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
    await productToUpdate.update(req.body);
    await db.disconnect();

    return res.status(200).json(productToUpdate);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar la consola del servidor" });
  }
};

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IProductSchema;

  if (images.length < 1) {
    return res
      .status(400)
      .json({ message: "Es necesario al menos una imágenes" });
  }

  try {
    await db.connect();
    const productInDB = await Product.findOne({ title: req.body.title });

    if (productInDB) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "Ya existe un producto con ese nombre" });
    }

    const product = new Product(req.body);
    await product.save();

    await db.disconnect();

    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar la consola del servidor" });
  }
};

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {id = ""} = req.query;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "El ID del producto no es válido" });
  }

  try {
  
    await db.connect();
      await Product.deleteOne({_id: id})
    await db.disconnect();
  
    return res.status(200).json({message: `Producto con id: ${id}, fue borrado con éxito`})
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(400).json({ message: "Revisar la consola del servidor" });
  }

  
}