import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { UserRepository } from 'src/user/user.repository';
// import * as bcrypt from 'bcrypt';
// import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(registerUserDto: RegisterUserDto) {
    try {
      const { email } = registerUserDto;

      const user = await this.userRepository.findByEmail(email);

      if (user) {
        throw Error('Already exist');
      }

      const createdUser = await this.userRepository.create(registerUserDto);
    } catch (error) {
      throw error;
    }
  }

  /*
  constructor(private readonly userService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const passwordMatch: boolean = await this.passworMatch(
      password,
      user.password,
    );
    if (!passwordMatch)
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles.map((role) => role.name),
    };
  }

  async passworMatch(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async login(): Promise<any> {
    return {
      message: 'Login successful',
      statusCode: HttpStatus.OK,
    };
  }

  async logout(@Req() request: Request): Promise<any> {
    request.session.destroy(() => {
      return {
        message: 'Logout successful',
        statusCode: HttpStatus.OK,
      };
    });
  }
    */
}
