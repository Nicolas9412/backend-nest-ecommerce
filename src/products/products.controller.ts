import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductCreateDTO } from './dto/productCreate.dto';
import { ProductUpdateDTO } from './dto/productUpdate.dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Roles(Role.Admin)
  @Post()
  async createProduct(@Body() productDTO: ProductCreateDTO, @Res() res) {
    const product = await this.productsService.createProduct(productDTO);
    return res.status(HttpStatus.OK).json({ product });
  }
  @Roles(Role.Admin)
  @Put(':id')
  async updateProduct(
    @Body() productDTO: ProductUpdateDTO,
    @Param('id') id: string,
    @Res() res,
  ) {
    try {
      const productUpdated = await this.productsService.updateProduct(
        id,
        productDTO,
      );
      return res.status(HttpStatus.OK).json({ productUpdated });
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @Res() res) {
    try {
      const productDeleted = await this.productsService.deleteProduct(id);
      return res.status(HttpStatus.OK).json({ productDeleted });
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
  @Get()
  async getProducts(@Res() res) {
    const products = await this.productsService.getProducts();
    return res.status(HttpStatus.OK).json({ products });
  }
  @Get(':id')
  async getProduct(@Res() res, @Param('id') id: string) {
    try {
      const product = await this.productsService.getProduct(id);
      return res.status(HttpStatus.OK).json({ product });
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
}
