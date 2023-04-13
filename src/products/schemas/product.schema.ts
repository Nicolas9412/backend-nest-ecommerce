import { Schema } from 'mongoose';

export const ProductSchema = new Schema(
  {
    name: { require: true, type: String },
    price: { require: true, type: Number },
    stock: { require: true, type: Number },
    urlImage: { require: true, type: String },
    datetime: { require: true, type: Date, default: Date.now() },
  },
  { versionKey: false },
);
