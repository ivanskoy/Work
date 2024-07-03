import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/CreateUserDto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll(@Query('limit') limit: number = 15): Promise<User[]> {
    return await this.userService.findAll(limit);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return await this.userService.findById(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.userService.create(createUserDto);
    } catch (err) {
      console.log(err);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    try {
      return await this.userService.delete(id);
    } catch (err) {
      console.log(err);
    }
  }
}
