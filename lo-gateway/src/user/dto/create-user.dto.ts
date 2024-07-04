import { UserGender } from '../enums/user-gender.enum';
import { DateString } from '../types/date-string';

export class CreateUserDto {
  id: string;

  nickname: string;
  email: string;
  password: string;

  fullname: string;
  gender: UserGender;
  birthday: DateString;
  phone: string;
  profession: string;
}
