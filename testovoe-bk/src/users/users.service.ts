import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/CreateUserDto';
import { checkIp } from 'src/utils/checkIp';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findAll(limit: number): Promise<User[]> {
    try {
      return await this.usersRepository.findAll(limit);
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string): Promise<User> {
    try {
      return await this.usersRepository.findById(id);
    } catch (err) {
      throw err;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { ip } = createUserDto;
      const { country, city } = await checkIp(ip);

      if (country) createUserDto.country = country;
      if (city) createUserDto.city = city;

      return await this.usersRepository.create(createUserDto);
    } catch (err) {
      throw err;
    }
  }

  async delete(id: string): Promise<User> {
    try {
      return await this.usersRepository.delete(id);
    } catch (err) {
      throw err;
    }
  }
}
