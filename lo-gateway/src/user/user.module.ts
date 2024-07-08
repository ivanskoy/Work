import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import UserSchema, { User } from 'src/schemas/user.schema';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
