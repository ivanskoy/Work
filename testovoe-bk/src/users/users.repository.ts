import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(limit: number): Promise<User[]> {
    try {
      return await this.userModel.find().limit(limit);
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string): Promise<User> {
    try {
      return await this.userModel.findById(id);
    } catch (err) {
      throw err;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create(createUserDto);
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<User> {
    try {
      return await this.userModel.findOneAndDelete({ _id: id });
    } catch (err) {
      throw err;
    }
  }
}
