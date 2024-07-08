import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    try {
      return this.userRepository.create(createUserDto);
    } catch (error) {
      throw error;
    }
    // return createUserDto;
    // this.users.push(createUserDto);
    // return this.users.find((user) => user.id === createUserDto.id);
  }

  /*
  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.users.filter((user) => user.id !== id);
  }
  */
}
