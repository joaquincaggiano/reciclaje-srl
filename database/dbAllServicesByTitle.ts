import { db } from '.';
import { Service } from '@/models';
import { IServiceSchema } from '@/interfaces';

export const getAllServicesByTitle = async (): Promise<IServiceSchema[] | null> => {
	await db.connect();
	const services = await Service.find().select("title -_id").lean();
	await db.disconnect();

	if (!services) {
		return null;
	}

	return JSON.parse(JSON.stringify(services));
};