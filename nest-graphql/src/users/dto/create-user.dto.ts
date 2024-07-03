import { Field, InputType, PartialType } from '@nestjs/graphql';
import { UserEntity } from 'src/entities/user.entity';

@InputType()
export class CreateUserDTO extends PartialType(UserEntity) {
  @Field()
  name: string;

  @Field()
  email: string;
}
