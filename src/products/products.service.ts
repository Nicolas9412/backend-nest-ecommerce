import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { ProductCreateDTO } from './dto/productCreate.dto';
import { ProductUpdateDTO } from './dto/productUpdate.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Products') private readonly productsModel: Model<Product>,
  ) {}
  async createProduct(productDTO: ProductCreateDTO): Promise<Product> {
    const product = new this.productsModel(productDTO);
    await product.save();
    return product;
  }
  async getProducts(): Promise<Product[]> {
    return await this.productsModel.find();
  }
  async getProduct(productID: string): Promise<Product> {
    try {
      return await this.productsModel.findById(productID);
    } catch (error) {
      throw 'Producto no encontrado';
    }
  }
  async updateProduct(
    productID: string,
    productUpdate: ProductUpdateDTO,
  ): Promise<Product> {
    try {
      const product = await this.getProduct(productID);
      return await this.productsModel.findByIdAndUpdate(
        productID,
        Object.assign(product, productUpdate),
        { new: true },
      );
    } catch (error) {
      throw error;
    }
  }
  async deleteProduct(productID: string): Promise<Product> {
    try {
      const product = await this.getProduct(productID);
      return await this.productsModel.findByIdAndDelete(productID);
    } catch (error) {
      throw error;
    }
  }
}
