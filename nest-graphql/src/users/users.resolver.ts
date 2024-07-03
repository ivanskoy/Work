import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'src/entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @Query(() => [UserEntity])
  async findAllUsers(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('size', { type: () => Int, defaultValue: 15 }) size: number,
  ): Promise<UserEntity[]> {
    return await this.usersService.findAll(page, size);
  }

  @Mutation(() => UserEntity)
  async createUser(@Args('CreateUserDTO') createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }
}
