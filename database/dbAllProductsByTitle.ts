import { db } from '.';
import { Product } from '@/models';
import { IProductSchema } from '@/interfaces';

export const getAllProductsByTitle = async (): Promise<IProductSchema[] | null> => {
	await db.connect();
	const products = await Product.find().select("title -_id").lean();
	await db.disconnect();

	if (!products) {
		return null;
	}

	return JSON.parse(JSON.stringify(products));
};
