import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      return await this.authService.register(registerUserDto);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /*
  login() {

  }

  logout() {

  }
  */
}
