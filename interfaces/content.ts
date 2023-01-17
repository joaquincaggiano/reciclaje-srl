import { IContact, IServices, IProduct, IBlog, IHome } from "./contentInfo";

export interface Content {
  contact: IContact
  services: IServices
  products: IProduct
  blog: IBlog
  home: IHome
}
