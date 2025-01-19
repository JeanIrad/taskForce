import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, IsDate } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ description: 'Transaction amount', example: 250.75 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Type of transaction', example: 'expense' })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Description of the transaction',
    example: 'Grocery shopping',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Account ID associated with the transaction',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  accountId: string;

  @ApiProperty({
    description: 'Category ID associated with the transaction',
    example: '123e4567-e89b-12d3-a456-426614174111',
  })
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    description: 'Date of the transaction',
    example: '2024-01-18',
  })
  @IsDate()
  transactionDate: Date;
}
export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {}
