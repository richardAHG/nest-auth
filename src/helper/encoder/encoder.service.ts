import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncoderService {
  async encoderPasword(password: string): Promise<string> {
    //hash de password
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async checkPassword(
    password: string,
    passwordUserDb: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordUserDb);
  }
}
