import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { REDIS } from 'src/constants/redis.constants';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS) private redis: RedisClientType) {}

  get(key: string) {
    return this.redis.get(key);
  }

  set(key: string, value) {
    return this.redis.set(key, value);
  }
}
