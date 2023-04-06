import { IContact, IServices, IProduct, IBlog, IHome, IAboutUs } from "./contentInfo";

export interface Content {
  contact: IContact
  services: IServices
  products: IProduct
  blog: IBlog
  home: IHome
  aboutUs: IAboutUs
}
