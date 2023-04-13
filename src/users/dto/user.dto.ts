import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class UserDTO {
  @IsString({ message: 'El nombre de usuario tiene que ser un texto' })
  @IsNotEmpty({ message: 'El nombre de usuario es requerida' })
  @MinLength(3, {
    message: 'El nombre de usuario debe tener 3 caracteres o más',
  })
  @MaxLength(20, {
    message: 'El nombre de usuario no debe pasar los 20 caracteres',
  })
  @Matches('^(?=.{4,20}$)(?:[a-zA-Zd]+(?:(?:.|-|_)[a-zA-Zd])*)+$', '', {
    message:
      'El nombre de usuario solo puede tener letras, numeros y guiones medios, bajos y puntos como separadores',
  })
  username: string;
  @IsString({ message: 'La contraseña tiene que ser un texto' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener 6 caracteres o más' })
  @Matches(
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
    '',
    {
      message:
        'La contraseña debe contener minúsculas, mayúsculas, números y signos especiales (!@#$&*)',
    },
  )
  password: string;
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'El email es inválido' })
  email: string;
}
