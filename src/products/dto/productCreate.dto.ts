import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class ProductCreateDTO {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  name: string;
  @IsNotEmpty({ message: 'El precio es requerido' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser positivo' })
  price: number;
  @IsNotEmpty({ message: 'El stock es requerido' })
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @IsPositive({ message: 'El stock debe ser positivo' })
  stock: number;
  @IsNotEmpty({ message: 'La imagen es requerida' })
  @IsUrl({}, { message: 'url inválida' })
  urlImage: string;
}
