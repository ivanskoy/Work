import { registerAs } from '@nestjs/config';

export default registerAs('hash', () => ({
  salt: parseInt(process.env.SALT) || 7,
  secret: process.env.SECRET,
}));
