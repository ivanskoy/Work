import { UserGender } from '../enums/user-gender.enum';
import { DateString } from '../types/date-string';

export class User {
  id: string;

  nickname: string;
  email: string;
  password: string;

  fullname?: string;
  gender: UserGender;
  birthday?: DateString;
  phone?: string;
  profession?: string;

  // premium
  // rating
  // followers
  // subscriptions
  // liked
  // bookmarks
}
