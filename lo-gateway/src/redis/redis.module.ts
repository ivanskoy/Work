import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import * as Redis from 'redis';

import { REDIS } from 'src/constants/redis.constants';
import { RedisService } from './redis.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      inject: [ConfigService],
      provide: REDIS,
      useFactory: async (config: ConfigService) =>
        await Redis.createClient({
          url: `redis://${config.get('redis.host')}:${config.get('redis.port')}`,
        }).connect(),
    },
    RedisService,
  ],
})
export class RedisModule {}
