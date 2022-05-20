import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private _userRepositroy: UsersRepository,
  ) {}

  async createUser(registerUser: RegisterUserDto): Promise<void> {
    return this._userRepositroy.createUser(registerUser);
  }
}
