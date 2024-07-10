import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password } = createUserDto;
      createUserDto.password = await this.hashService.hash(password);

      return this.userRepository.create(createUserDto);
    } catch (error) {
      throw error;
    }
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
