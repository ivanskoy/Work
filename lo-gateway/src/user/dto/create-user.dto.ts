// import { UserGender } from '../enums/user-gender.enum';
// import { DateString } from '../types/date-string';

import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  // id: string;

  // nickname: string;
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(21)
  password: string;

  // fullname: string;
  // gender: UserGender;
  // birthday: DateString;
  // phone: string;
  // profession: string;
}
