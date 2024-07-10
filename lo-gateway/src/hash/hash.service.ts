import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private salt: number;
  private secret: string;

  constructor(private configService: ConfigService) {
    this.salt = this.configService.get('hash.salt');
    this.secret = this.configService.get('hash.secret');
  }

  async hash(data: string) {
    return await bcrypt.hash(data + this.secret, this.salt);
  }

  async compare(data: string, hash: string) {
    return await bcrypt.compare(data, hash);
  }
}
