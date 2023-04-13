import { Document } from 'mongoose';
import { Types } from 'mongoose';

export interface Product extends Document {
  _id: Types.ObjectId;
  name: string;
  price: number;
  stock: number;
  urlImage: string;
  datetime: Date;
}
