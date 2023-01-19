export interface IProduct {
    title: string
    metaHeader: string
    imageFullUrl?: string
    datosProducto: ProductsInfo[]
}

export interface ProductsInfo {
    title: string
    description: string
    image?: string
}