import mongoose, { Schema, model, Model } from "mongoose";
import { IBlogSchema } from "@/interfaces";

const blogSchema = new Schema(
  {
    title: { type: String, required: true, default: "" },
    images: [{ type: String }],
    description: { type: String, required: true, default: "" },
    info: { type: String, required: true, default: "" },
  },
  {
    timestamps: true,
  }
);

const Blog: Model<IBlogSchema> = mongoose.models.Blog || model("Blog", blogSchema);

export default Blog;