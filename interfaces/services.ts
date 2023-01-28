export interface IServiceSchema {
    _id: string;
    title: string;
    images: string[];
    description: string;
    createdAt?: string;
    updatedAt?: string;
}