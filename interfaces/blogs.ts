export interface IBlogSchema {
    _id: string;
    title: string;
    images: string[];
    description: string;
    info: string;
    createdAt?: string;
    updatedAt?: string;
}