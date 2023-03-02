import { db } from ".";
import { Service } from "@/models";
import { IServiceSchema } from "@/interfaces";

export const getServiceByTitle = async (
  title: string
): Promise<IServiceSchema | null> => {
  await db.connect();
  const service = await Service.findOne({ title }).lean();
  await db.disconnect();

  if (!service) return null;

  return JSON.parse(JSON.stringify(service));
};
