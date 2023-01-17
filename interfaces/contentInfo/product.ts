export interface IProduct {
    title: string
    pageDescription: string
    imageFullUrl?: string
    datosProducto: ProductsInfo[]
}

export interface ProductsInfo {
    title: string
    description: string
    image?: string
}