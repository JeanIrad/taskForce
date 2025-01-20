import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'johndoe@example.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'refreshToken' })
  @IsString()
  refreshToken: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJmMjhjOGMyLTI5MzktNDAzMy04Y2U5LWY1YjljNWVhODY3MCIsImVtYWlsIjoiamFkb25nZW5kYUBnbWFpbC5jb20iLCJpYXQiOjE3MzUwNDAyMzcsImV4cCI6MTczNTA0MTEzN30.yV23uKTDRzPy4KPh8wF99DLmEnKGaJPOYivA0eCtEjo',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @IsNotEmpty()
  newPassword: string;
}

export class PasswordResetDto {
  @ApiProperty({ example: 'johndoe@example.com' })
  @IsString()
  @IsEmail()
  email: string;
}
