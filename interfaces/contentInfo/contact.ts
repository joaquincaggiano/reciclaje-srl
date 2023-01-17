export interface IContact {
    title: string
    pageDescription: string
    imageFullUrl?: string
    datosContacto: DatosContacto
}

export interface DatosContacto {
    whatsapp: string
    email: string
}