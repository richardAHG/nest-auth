import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncoderService } from 'src/helper/encoder/encoder.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private _userRepositroy: UsersRepository,
    private _helpercEncoder: EncoderService,
  ) {}

  async createUser(registerUser: RegisterUserDto): Promise<void> {
    const { name, email, password } = registerUser;
    const hashedPassword = await this._helpercEncoder.encoderPasword(password);
    return this._userRepositroy.createUser(name, email, hashedPassword);
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;
    const user = await this._userRepositroy.findOneByEmail(email);
    if (
      email &&
      (await this._helpercEncoder.checkPassword(password, user.password))
    ) {
      return 'jwt';
    }
    throw new UnauthorizedException('Please check your credentials');
  }
}
