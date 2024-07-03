import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAll(page: number, size: number) {
    return this.usersRepository.find({
      take: size,
      skip: size * (page - 1),
      order: { created_at: 'DESC' },
    });
  }

  create(createUserDro: CreateUserDTO) {
    return this.usersRepository.save(createUserDro);
  }
}
