import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false })
export class User {
  @Prop({ required: true, unique: true })
  _id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  ip: string;

  @Prop()
  country: string;

  @Prop()
  city: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
