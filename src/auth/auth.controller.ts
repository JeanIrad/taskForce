import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, PasswordResetDto, ResetPasswordDto } from './dto/auth.dto';
// import { RefreshTokenGuard } from 'src/guards/auth-guards/refresh-token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiBody({
    type: LoginDto,
  })
  @ApiOperation({ description: 'Login a user' })
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginBody: LoginDto) {
    return await this.authService.login(loginBody);
  }

  //   @ApiOperation({ description: 'Refresh access token' })
  //   @ApiBody({ type: RefreshTokenDto })
  //   @HttpCode(200)
  //   @Post('refresh')
  //   @UseGuards(RefreshTokenGuard)
  //   async refreshTokens(@Body() body: RefreshTokenDto) {
  //     return this.authService.refreshTokens(body.refreshToken);
  //   }
  //   @ApiOperation({ description: 'Logout user', summary: 'Logout a user' })
  //   @HttpCode(200)
  //   @Post('logout')
  //   @UseGuards(RefreshTokenGuard)
  //   async logout(@Body() body: { refreshToken: string }) {
  //     return this.authService.logout(body.refreshToken);
  //   }

  //   @ApiOperation({
  //     description: 'Requesting a reset password link',
  //     summary: 'Request Reset Password',
  //   })
  //   @ApiBody({ type: PasswordResetDto })
  //   @HttpCode(HttpStatus.OK)
  //   @Post('request-reset-password')
  //   async requestResetPassword(@Body() dto: PasswordResetDto) {
  //     return this.authService.requestResetPassword(dto.email);
  //   }
  @ApiOperation({
    description: '  reset password link',
    summary: ' Reset Password',
  })
  @ApiBody({ type: ResetPasswordDto })
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
