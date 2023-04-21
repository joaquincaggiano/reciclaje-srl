import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { Blog } from "@/models";
import { IBlogSchema } from "../../../interfaces";
import { isValidObjectId } from "mongoose";
import axios from "axios";

type Data = { message: string } | IBlogSchema[] | IBlogSchema;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getBlogs(req, res);
    case "PUT":
      return updateBlog(req, res);
    case "POST":
      return createBlog(req, res);
    case "DELETE":
      return deleteBlog(req, res);

    default:
      return res.status(400).json({ message: "Bad Request" });
  }
}

const getBlogs = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const blogs = await Blog.find().sort("asc").lean();
  await db.disconnect();

  res.status(200).json(blogs);
};

const updateBlog = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id = "", images = [] } = req.body as IBlogSchema;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "El ID del blog no es válido" });
  }

  if (images.length < 1) {
    return res
      .status(400)
      .json({ message: "Es necesario al menos una imagen" });
  }

  try {
    await db.connect();

    const blogToUpdate = await Blog.findById(_id);

    if (!blogToUpdate) {
      await db.disconnect();
      return res.status(400).json({ message: "No existe un blog con ese ID" });
    }

    // toDo: eliminar las fotos del servidor donde las alojemos (AWS)

    await blogToUpdate.update(req.body);
    await db.disconnect();

    return res.status(200).json(blogToUpdate);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar la consola del servidor" });
  }
};

const createBlog = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { images = [] } = req.body as IBlogSchema;

  if (images.length < 1) {
    return res
      .status(400)
      .json({ message: "Es necesario al menos una imágenes" });
  }

  try {
    await db.connect();
    const blogInDB = await Blog.findOne({ title: req.body.title });

    if (blogInDB) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "Ya existe un producto con ese nombre" });
    }

    const blog = new Blog(req.body);
    await blog.save();

    await db.disconnect();

    return res.status(201).json(blog);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar la consola del servidor" });
  }
};

const deleteBlog = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id = "" } = req.query;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "El ID del blog no es válido" });
  }

  try {
    await db.connect();
    await Blog.deleteOne({ _id: id });
    await db.disconnect();

    return res
      .status(200)
      .json({ message: `Blog con id: ${id}, fue borrado con éxito` });
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(400).json({ message: "Revisar la consola del servidor" });
  }
};
