import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService) {}

  async hash(valueToBeHashed: string): Promise<string> {
    const saltOrRounds =
      this.configService.getOrThrow<number>('hash.saltOrRounds');
    const hashedValue = await bcrypt.hash(valueToBeHashed, saltOrRounds);

    return hashedValue;
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    const areValuesMatching = await bcrypt.compare(value, hashedValue);
    return areValuesMatching;
  }
}
