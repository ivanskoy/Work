import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RedisModule } from './redis/redis.module';
import { SessionModule } from './session/session.module';
import { HashModule } from './hash/hash.module';

import applicationConfig from './config/application.config';
import mongoConfig from './config/mongo.config';
import redisConfig from './config/redis.config';
import hashConfig from './config/hash.config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      load: [applicationConfig, mongoConfig, redisConfig, hashConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: `mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.collection')}`,
      }),
      inject: [ConfigService],
    }),
    RedisModule,
    SessionModule,
    HashModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
