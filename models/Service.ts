import mongoose, { Schema, model, Model } from "mongoose";
import { IServiceSchema } from "@/interfaces";

const serviceSchema = new Schema(
  {
    title: { type: String, required: true, default: "" },
    images: [{ type: String }],
    description: { type: String, required: true, default: "" },
  },
  {
    timestamps: true,
  }
);

const Service: Model<IServiceSchema> = mongoose.models.Service || model("Service", serviceSchema);

export default Service;
