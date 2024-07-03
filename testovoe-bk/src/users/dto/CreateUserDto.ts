import {
  IsEmail,
  IsIP,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { IsIsraeliId } from 'src/decorators/isIsraeliId';

export class CreateUserDto {
  @IsNumberString()
  @IsIsraeliId()
  _id: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  fullname: string;

  @IsPhoneNumber('IL')
  phone: string;

  @IsIP()
  ip: string;

  @IsNotEmpty()
  @IsOptional()
  country?;

  @IsNotEmpty()
  @IsOptional()
  city?;
}
