import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  host: process.env.MONGO_DB_HOST || 'localhost',
  port: process.env.MONGO_DB_PORT || 27017,
  collection: process.env.MONGO_DB_COLLECTION || 'users',
}));
