import {
  IsString,
  IsUrl,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class ProductUpdateDTO {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  name: string;

  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser positivo' })
  price: number;

  @IsOptional()
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @IsPositive({ message: 'El stock debe ser positivo' })
  stock: number;

  @IsOptional()
  @IsUrl({}, { message: 'url inválida' })
  urlImage: string;
}
