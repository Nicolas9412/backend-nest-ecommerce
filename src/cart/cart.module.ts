import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from './schemas/cart.schema';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/products.service';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([{ name: 'Carts', schema: CartSchema }]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
