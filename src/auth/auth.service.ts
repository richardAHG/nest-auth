import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';

import { EncoderService } from 'src/helper/encoder/encoder.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { UsersRepository } from './users.repository';
import { ActivateUserDto } from './dto/activate-user.dto';
import { User } from './user.entity';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

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
    const activationtoken = v4();
    return this._userRepositroy.createUser(
      name,
      email,
      hashedPassword,
      activationtoken,
    );
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user: User = await this._userRepositroy.findOneByEmail(email);
    if (await this._helpercEncoder.checkPassword(password, user.password)) {
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

  async activateUser(activeUserDto: ActivateUserDto): Promise<void> {
    const { id, code } = activeUserDto;
    const user: User =
      await this._userRepositroy.findOneInactiveByIdAndActivationToken(
        id,
        code,
      );

    if (!user) {
      throw new UnprocessableEntityException('this action can no t be done');
    }
    this._userRepositroy.activateUser(user);
  }

  async requestResetPassword(
    requestResetPasswordDto: RequestResetPasswordDto,
  ): Promise<void> {
    const { email } = requestResetPasswordDto;
    const user: User = await this._userRepositroy.findOneByEmail(email);
    user.resetPasswordToken = v4();
    this._userRepositroy.save(user);
    //FIXME: AGREGAR FUNCION DE ENVIO DE CORREO PARA EL USUARIO
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { resetPasswordToken, password } = resetPasswordDto;
    const user: User = await this._userRepositroy.findOnebyResetPasswordToken(
      resetPasswordToken,
    );
    user.password = await this._helpercEncoder.encoderPasword(password);
    user.resetPasswordToken = null;
    this._userRepositroy.save(user);
  }
}
