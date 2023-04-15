import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './interfaces/cart.interface';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Carts') private readonly cartsModel: Model<Cart>,
    private readonly productsService: ProductsService,
  ) {}
  async getCartByIdUser(userID: string): Promise<Cart> {
    try {
      return await this.cartsModel.findOne({ userID }).lean();
    } catch (error) {
      throw 'Carrito no encontrado';
    }
  }
  async addProductToCart(
    productID: string,
    quantity: number,
    userID: string,
  ): Promise<Cart> {
    const cart = await this.getCartByIdUser(userID);
    const product = await this.productsService.getProduct(productID);
    if (quantity > product.stock) throw 'El stock es insuficiente';
    if (cart) {
      const isProductInCart = cart.products.find(
        (item) => item._id.toString() == productID,
      );
      if (isProductInCart) {
        const arrFilter: any = cart.products.filter(
          (item) => item._id.toString() != productID,
        );
        arrFilter.push({ ...product.toObject(), quantity });
        const cartUpdate = {
          ...cart,
          products: arrFilter,
        };
        return await this.cartsModel.findByIdAndUpdate(cart._id, cartUpdate, {
          new: true,
        });
      } else {
        const cartUpdate = {
          ...cart,
          products: [...cart.products, { ...product.toObject(), quantity }],
        };
        return await this.cartsModel.findByIdAndUpdate(cart._id, cartUpdate, {
          new: true,
        });
      }
    } else {
      const newCart = new this.cartsModel({
        products: [{ ...product.toObject(), quantity }],
        userID,
      });
      await newCart.save();
      return newCart;
    }
  }
  async deleteProductToCart(productID: string, userID: string): Promise<Cart> {
    const cart = await this.getCartByIdUser(userID);
    const product = await this.productsService.getProduct(productID);
    if (
      cart.products.find(
        (item) => item._id.toString() == product._id.toString(),
      )
    ) {
      if (cart.products.length == 1) {
        await this.cartsModel.findByIdAndDelete(cart._id);
        return null;
      } else {
        const productsFiltered = cart.products.filter(
          (item) => item._id.toString() != product._id.toString(),
        );
        const cartUpdated = { ...cart, products: productsFiltered };
        return await this.cartsModel.findByIdAndUpdate(cart._id, cartUpdated, {
          new: true,
        });
      }
    } else {
      throw 'No se encontró el producto en el carrito';
    }
  }
  async clearCart(userID: string) {
    const cartToDelete = await this.getCartByIdUser(userID);
    await this.cartsModel.findByIdAndDelete(cartToDelete._id);
    return null;
  }
}
