import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = Number(process.env.CRYPT_SALT) || 10;

@Injectable()
export class CryptoService {
  async getHash(str: string) {
    return await bcrypt.hash(str, SALT_ROUNDS);
  }

  async compare(data: string, encrypted: string) {
    return await bcrypt.compare(data, encrypted);
  }
}
