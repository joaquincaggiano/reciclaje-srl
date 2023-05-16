import { db } from '.';
import { Blog } from '@/models';
import { IBlogSchema } from '@/interfaces';

export const getAllBlogsByTitle = async (): Promise<IBlogSchema[] | null> => {
	await db.connect();
	const blogs = await Blog.find().select("title -_id").lean();
	await db.disconnect();

	if (!blogs) {
		return null;
	}

	return JSON.parse(JSON.stringify(blogs));
};