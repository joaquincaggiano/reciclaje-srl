export interface IBlog {
    title: string
    metaHeader: string
    imageFullUrl?: string
    // datosBlog: BlogInfo[]
}

export interface BlogInfo {
    title: string
    description: string
    info: string
    image?: string
}