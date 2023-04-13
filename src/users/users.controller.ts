import {
  Controller,
  Body,
  Post,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dto/user.dto';
import { Public } from '../auth/constants';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Public()
  @Post()
  async createUser(@Body() userDTO: UserDTO, @Res() res: Response) {
    try {
      const user = await this.usersService.createUser(userDTO);
      return res.json({
        message: 'Create user sucessful',
        user,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
