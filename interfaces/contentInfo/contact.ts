export interface IContact {
    title: string
    metaHeader: string
    imageFullUrl?: string
    datosContacto: DatosContacto
}

export interface DatosContacto {
    whatsapp: string
    email: string
}