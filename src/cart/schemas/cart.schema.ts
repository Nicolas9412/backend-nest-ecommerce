import { Schema, Types } from 'mongoose';

export const CartSchema = new Schema(
  {
    products: { type: Array, require: true },
    datetime: { type: Date, require: true, default: Date.now() },
    userID: { type: Types.ObjectId, require: true },
  },
  { versionKey: false },
);
