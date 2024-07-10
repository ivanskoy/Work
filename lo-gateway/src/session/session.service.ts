import { Injectable } from '@nestjs/common';
import { HashService } from 'src/hash/hash.service';

import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class SessionService {
  constructor(
    private redisService: RedisService,
    private hashService: HashService,
  ) {}

  getSessions(userId: string) {
    this.redisService.get(userId);
  }

  async createSession(userId: string) {
    const sessionId = await this.hashService.hash(userId);
    this.redisService.set(sessionId, userId);

    const sessions = await this.redisService.get(userId);
    this.redisService.set(userId, [...sessions, sessionId]);
  }

  async getUserBySessionId(sessionId: string) {
    const userId = await this.redisService.get(sessionId);

    return userId;
  }
}
