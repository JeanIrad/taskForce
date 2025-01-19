import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Username of the user', example: 'EricDoe' })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'eric@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user',
    example: 'strongPassword123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
