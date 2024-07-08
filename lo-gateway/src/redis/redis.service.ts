import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { REDIS } from 'src/constants/redis.constants';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS) private redis: RedisClientType) {}
}
