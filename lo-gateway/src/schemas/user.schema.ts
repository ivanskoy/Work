import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// import { UserGender } from 'src/user/enums/user-gender.enum';
// import { DateString } from 'src/user/types/date-string';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  // @Prop()
  // nickname: string;
  @Prop()
  email: string;
  @Prop()
  password: string;

  // @Prop()
  // fullname?: string;
  // @Prop()
  // gender: UserGender;
  // @Prop()
  // birthday?: DateString;
  // @Prop()
  // phone?: string;
  // @Prop()
  // profession?: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
  virtuals: true,
});

export default UserSchema;
