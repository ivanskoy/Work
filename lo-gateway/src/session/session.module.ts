import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { RedisModule } from 'src/redis/redis.module';
import { HashModule } from 'src/hash/hash.module';

@Module({
  imports: [RedisModule, HashModule],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
