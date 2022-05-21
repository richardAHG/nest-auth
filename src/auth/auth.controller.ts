import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

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

  @Get('/activate-account')
  activateAccount(@Query() activateUserDto: ActivateUserDto): Promise<void> {
    return this._authService.activateUser(activateUserDto);
  }

  @Post('/request-reset-password')
  requestresetPassword(
    @Body() requestResetPasswordDto: RequestResetPasswordDto,
  ): Promise<void> {
    return this._authService.requestResetPassword(requestResetPasswordDto);
  }

  @Patch()
  resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    return this._authService.resetPassword(resetPasswordDto);
  }
}
