import { Types } from 'mongoose';
import { ProductInCart } from '../../products/interfaces/productInCart.interface';

export interface Cart {
  _id: Types.ObjectId;
  products: Array<ProductInCart>;
  datetime: Date;
  userID: Types.ObjectId;
}
