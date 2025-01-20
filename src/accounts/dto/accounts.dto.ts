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
}
export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
