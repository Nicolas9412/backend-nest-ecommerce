import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './intefaces/user.interface';
import { UserDTO } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username });
  }

  async createUser(userDTO: UserDTO): Promise<User> {
    const { username, password } = userDTO;
    if (await this.findByUsername(username)) {
      throw 'User already register';
    }
    const passwordHash = await hash(password, 10);
    userDTO = { ...userDTO, password: passwordHash };
    const user = new this.userModel(userDTO);
    user.save();
    return user;
  }
  async getUsers(): Promise<User[]> {
    return await this.userModel.find();
  }
}
