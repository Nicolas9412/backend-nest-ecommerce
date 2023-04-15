import {
  Controller,
  Body,
  Res,
  Request,
  Post,
  Delete,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './interfaces/cart.interface';
import { DataForCart } from './dto/dataForCart.dt';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Roles(Role.User)
  @Post()
  async addProductToCart(
    @Body() dataForCart: DataForCart,
    @Request() req,
    @Res() res,
  ): Promise<Cart> {
    try {
      const userID = req['user'].sub;
      const { productID, quantity } = dataForCart;
      const cart = await this.cartService.addProductToCart(
        productID,
        quantity,
        userID,
      );
      return res.status(HttpStatus.OK).json({ cart });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  @Roles(Role.User)
  @Delete('/product/:id')
  async deleteProductToCart(
    @Param('id') productID: string,
    @Request() req,
    @Res() res,
  ) {
    try {
      const userID = req['user'].sub;
      const cart = await this.cartService.deleteProductToCart(
        productID,
        userID,
      );
      return res.status(HttpStatus.OK).json({ cart });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  @Roles(Role.User)
  @Delete()
  async clearCart(@Request() req, @Res() res) {
    try {
      const userID = req['user'].sub;
      const cart = await this.cartService.clearCart(userID);
      return res.status(HttpStatus.OK).json({ cart });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
