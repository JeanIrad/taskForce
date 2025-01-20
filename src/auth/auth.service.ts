// import { JWTPayload } from '../common/types/index';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { LoginDto, ResetPasswordDto } from './dto/auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
// import { RefreshToken } from 'src/users/entities/refresh-token.entity';
// import { MailService } from 'src/mail/mail.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    // @InjectRepository(RefreshToken)
    // private refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(User) private userRepository: Repository<User>,
    // private readonly mailService: MailService,
  ) {}
  async login({ email, password }: LoginDto): Promise<{
    user: any;
    accessToken: string;
  }> {
    const user = await this.validateUser(email, password);

    const tokens = await this.generateTokens(user);

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      accessToken: tokens.accessToken,
    };
  }
  async validateUser(email: string, rawPassword: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      //   relations: ['role', 'profile'],
    });

    if (!user) throw new UnauthorizedException('User does not exist!');

    const passwordMatches = await bcrypt.compare(rawPassword, user.password);
    if (!passwordMatches) throw new UnauthorizedException('Invalid Password');
    // await this.userService.updateLastLogin(user.id);
    return user;
  }

  async generateTokens(user: User) {
    // const [accessToken, refreshToken] = await Promise.all([
    //   this.generateAccessToken(user),
    // //   this.generateRefreshToken(user),
    // ]);

    // Store refresh token (hashed) in database
    // await this.storeRefreshToken(user.id, refreshToken);
    const accessToken = await this.generateAccessToken(user);
    return {
      accessToken,
      //   refreshToken,
      user: {
        id: user.id,
        email: user.email,
        // name: `${user.firstName} ${user.lastName}`,
      },
    };
  }

  private async generateAccessToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
      },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
      },
    );
  }
  private async generatePasswordResetToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
      },
      {
        secret: process.env.JWT_PASSWORD_RESET_SECRET,
        expiresIn: '15m',
      },
    );
  }
  //   private async generateRefreshToken(user: User): Promise<string> {
  //     return this.jwtService.signAsync(
  //       {
  //         id: user.id,
  //         email: user.email,
  //         role: user?.role?.name,
  //       },
  //       {
  //         secret: process.env.JWT_REFRESH_SECRET,
  //         expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
  //       },
  //     );
  //   }

  //   private async storeRefreshToken(userId: string, refreshToken: string) {
  //     // Hash the refresh token before storing
  //     const hashedToken = await bcrypt.hash(refreshToken, 10);

  //     // Find or create a refresh token entry
  //     const existingTokenEntry = await this.refreshTokenRepository.findOne({
  //       where: { user: { id: userId } },
  //     });

  //     if (existingTokenEntry) {
  //       existingTokenEntry.token = hashedToken;
  //       await this.refreshTokenRepository.save(existingTokenEntry);
  //     } else {
  //       const newTokenEntry = this.refreshTokenRepository.create({
  //         user: { id: userId },
  //         token: hashedToken,
  //         expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  //       });
  //       await this.refreshTokenRepository.save(newTokenEntry);
  //     }
  //   }

  //   async refreshTokens(refreshToken: string) {
  //     try {
  //       // Verify the refresh token
  //       const decoded: JWTPayload = await this.jwtService.verifyAsync(
  //         refreshToken,
  //         {
  //           secret: process.env.JWT_REFRESH_SECRET,
  //         },
  //       );

  //       // Find the user
  //       const user = await this.userRepository.findOne({
  //         where: { id: decoded.id },
  //       });

  //       if (!user) {
  //         throw new UnauthorizedException('User not found');
  //       }

  //       // Find the stored refresh token entry
  //       const storedTokenEntry = await this.refreshTokenRepository.findOne({
  //         where: { user: { id: user.id } },
  //       });

  //       if (!storedTokenEntry) {
  //         throw new UnauthorizedException('Refresh token not found');
  //       }

  //       // Verify the stored token
  //       const isTokenValid = await bcrypt.compare(
  //         refreshToken,
  //         storedTokenEntry.token,
  //       );

  //       if (!isTokenValid) {
  //         // Invalidate all tokens if refresh token is compromised
  //         await this.refreshTokenRepository.remove(storedTokenEntry);
  //         throw new UnauthorizedException('Invalid refresh token');
  //       }

  //       // Check token expiration
  //       if (storedTokenEntry.expiresAt < new Date()) {
  //         await this.refreshTokenRepository.remove(storedTokenEntry);
  //         throw new UnauthorizedException('Refresh token expired');
  //       }

  //       // Generate new tokens
  //       return this.generateTokens(user);
  //     } catch (error) {
  //       console.log(error);
  //       throw new UnauthorizedException('Could not refresh tokens');
  //     }
  //   }
  //   async logout(refreshToken: string) {
  //     try {
  //       // Verify the refresh token
  //       const decoded = await this.jwtService.verifyAsync(refreshToken, {
  //         secret: process.env.JWT_REFRESH_SECRET,
  //       });

  //       // Remove the refresh token from the database
  //     //   await this.refreshTokenRepository.delete({
  //     //     user: { id: decoded.id },
  //     //   });
  //     // } catch (error) {
  //     //   // Log the error, but don't throw to prevent information leakage
  //     //   console.error('Logout error', error);
  //     // }
  //   }

  //   async requestResetPassword(email: string): Promise<{ message: string }> {
  //     const user = await this.userRepository.findOneBy({ email });
  //     if (!user) throw new NotFoundException('User not found');
  //     const token = await this.generatePasswordResetToken(user);
  //     const resetUrl = `${process.env.APP_URL}/auth/reset-password/?token=${token}`;
  //     await this.mailService.sendPasswordReset(user.email, {
  //       name: user?.profile?.firstName ?? 'User',
  //       resetUrl,
  //       expiresIn: '15 minutes',
  //     });

  //     return { message: 'Reset Password Email sent successfully!' };
  //   }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    const { token, newPassword } = resetPasswordDto;
    let decodedToken;
    try {
      decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_PASSWORD_RESET_SECRET,
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new BadRequestException('Password reset token has expired');
      }
      throw new BadRequestException('Invalid or expired token');
    }
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      throw new BadRequestException('Password rest token has expired');
    }
    const user = await this.userRepository.findOneBy({ id: decodedToken.id });
    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
    return { message: 'Password has been reset Successfully' };
  }
}
