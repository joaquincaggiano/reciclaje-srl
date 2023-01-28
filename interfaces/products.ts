export interface IProductSchema {
    _id: string;
    title: string;
    images: string[];
    colors: IColor[];
    category: ICategory
    createdAt?: string;
    updatedAt?: string;

}

export type ICategory = "Polietileno" | "Molienda";
export type IColor = "Blanco"| "Gris"| "Negro"| "Transparente"| "Caramelo"| "Amarillo"| "Verde"| "Azul"| "Rojo";