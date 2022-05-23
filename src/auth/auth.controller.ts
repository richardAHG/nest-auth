import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

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

  @Patch('/request-reset-password')
  requestresetPassword(
    @Body() requestResetPasswordDto: RequestResetPasswordDto,
  ): Promise<void> {
    return this._authService.requestResetPassword(requestResetPasswordDto);
  }

  @Patch('/reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
    return this._authService.resetPassword(resetPasswordDto);
  }

  @Patch('/change-password')
  @UseGuards(AuthGuard()) //indica que este metodo requiere autenticacion
  changePassord(
    @Body() changePassworDto: ChangePasswordDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this._authService.changePassword(changePassworDto, user);
  }
}
