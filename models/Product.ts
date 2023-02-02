import mongoose, { Schema, model, Model } from "mongoose";
import { IProductSchema } from "@/interfaces";


const productSchema = new Schema(
  {
    title: { type: String, required: true, default: "" },
    images: [{ type: String }],
    colors: [
      {
        type: String,
        enum: {
          values: [
            "Blanco",
            "Gris",
            "Negro",
            "Transparente",
            "Caramelo",
            "Amarillo",
            "Verde",
            "Azul",
            "Rojo",
          ],
          message: "{VALUE} no es un tamaño válido",
        },
      },
    ],
    category: {
      type: String,
      enum: {
        values: [
          "Polietileno",
          "Molienda"
        ],
        message: "{VALUE} no es un tipo válido",
      },
      default: "Polietileno",
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProductSchema> = mongoose.models.Product || model("Product", productSchema);

export default Product;
