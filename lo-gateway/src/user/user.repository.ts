import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { CreatedUserDto } from './dto/created-user.dto';
import { FoundUserDto } from './dto/found-user.dto';
import { OnlyDevelop } from 'src/decorators/only-develop.decorator';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string) {
    try {
      const foundUser = await this.userModel
        .findOne({ email: email }, { password: 0, __v: 0 })
        .exec();

      if (!foundUser) {
        return null;
      }

      const { id, email: foundEmail } = foundUser;

      return new FoundUserDto(id, foundEmail);
    } catch (error) {
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    try {
      const { id, email } = await this.userModel.create(createUserDto);

      return new CreatedUserDto(id, email);
    } catch (err) {
      throw err;
    }
  }

  @OnlyDevelop()
  async findAll(limit: number): Promise<User[]> {
    try {
      return await this.userModel.find().limit(limit);
    } catch (err) {
      throw err;
    }
  }

  @OnlyDevelop()
  async deleteAll() {
    try {
      return await this.userModel.deleteMany();
    } catch (err) {
      throw err;
    }
  }

  /*
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
  */

  /*
  async delete(id: string): Promise<User> {
    try {
      return await this.userModel.findOneAndDelete({ _id: id });
    } catch (err) {
      throw err;
    }
  }
  */
}
