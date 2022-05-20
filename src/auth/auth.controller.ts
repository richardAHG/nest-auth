import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('/register')
  regitser(@Body() payload: RegisterUserDto): Promise<void> {
    return this._authService.createUser(payload);
  }
}
