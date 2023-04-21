import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import { db } from "@/database";
import { Service } from "@/models";
import { IServiceSchema } from "../../../interfaces";

type Data = { message: string } | IServiceSchema[] | IServiceSchema;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getServices(req, res);
    case "PUT":
      return updateService(req, res);
    case "POST":
      return createService(req, res);
    case "DELETE":
      return deleteService(req, res);
    default:
      return res.status(400).json({ message: "Bad Request" });
  }
}

const getServices = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const services = await Service.find().sort("asc").lean();
  await db.disconnect();

  res.status(200).json(services);
};

const updateService = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = "", images = [] } = req.body as IServiceSchema;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "El ID del servicio no es válido" });
  }

  if (images.length < 1) {
    return res
      .status(400)
      .json({ message: "Es necesario al menos una imagen" });
  }

  try {
    await db.connect();

    const serviceToUpdate = await Service.findById(_id);

    if (!serviceToUpdate) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "No existe un servicio con ese ID" });
    }

    // toDo: eliminar las fotos del servidor donde las alojemos (AWS)

    await serviceToUpdate.update(req.body);
    await db.disconnect();

    return res.status(200).json(serviceToUpdate);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar la consola del servidor" });
  }
};

const createService = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IServiceSchema;

  if (images.length < 1) {
    return res
      .status(400)
      .json({ message: "Es necesario al menos una imágenes" });
  }

  try {
    await db.connect();
    const serviceInDB = await Service.findOne({ title: req.body.title });

    if (serviceInDB) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "Ya existe un servicio con ese nombre" });
    }

    const service = new Service(req.body);
    await service.save();

    await db.disconnect();

    return res.status(201).json(service);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Revisar la consola del servidor" });
  }
};

const deleteService = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id = "" } = req.query;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "El ID del servicio no es válido" });
  }

  try {
    await db.connect();
    await Service.deleteOne({ _id: id });
    await db.disconnect();

    return res
      .status(200)
      .json({ message: `Servicio con id: ${id}, fue borrado con éxito` });
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(400).json({ message: "Revisar la consola del servidor" });
  }
};
