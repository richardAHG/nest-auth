import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('/register')
  regitser(@Body() payload: RegisterUserDto): Promise<void> {
    return this._authService.createUser(payload);
  }

  @Post('/login')
  login(@Body() logindto: LoginDto): Promise<{ accessToken: string }> {
    return this._authService.login(logindto);
  }
}
