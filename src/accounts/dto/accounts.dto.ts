import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    description: 'Name of the account',
    example: 'Savings Account',
  })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Type of the account', example: 'Bank' })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Initial balance of the account',
    example: 1000.5,
  })
  @IsNumber()
  balance: number;

  @ApiProperty({
    description: 'ID of the user who owns the account',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  userId: string;
}
export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
