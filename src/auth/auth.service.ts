import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { EncoderService } from 'src/helper/encoder/encoder.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private _userRepositroy: UsersRepository,
    private _helpercEncoder: EncoderService,
    private _jwtService: JwtService,
  ) {}

  async createUser(registerUser: RegisterUserDto): Promise<void> {
    const { name, email, password } = registerUser;
    const hashedPassword = await this._helpercEncoder.encoderPasword(password);
    return this._userRepositroy.createUser(name, email, hashedPassword);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this._userRepositroy.findOneByEmail(email);
    if (
      email &&
      (await this._helpercEncoder.checkPassword(password, user.password))
    ) {
      const payload: JwtPayloadInterface = {
        id: user.id,
        email,
        active: user.active,
      };
      const accessToken = await this._jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('Please check your credentials');
  }
}
