import { Types, Document } from 'mongoose';

export interface ProductInCart extends Document {
  _id: Types.ObjectId;
  name: string;
  price: number;
  stock: number;
  urlImage: string;
  datetime: Date;
  quantity: number;
}
