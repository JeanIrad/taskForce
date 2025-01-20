import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsDate, IsUUID, IsPositive } from 'class-validator';

export class CreateBudgetDto {
  @ApiProperty({ description: 'Total budget amount', example: 5000.0 })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Start date of the budget period',
    example: '2024-01-01',
  })
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: 'End date of the budget period',
    example: '2024-01-31',
  })
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @ApiProperty({
    description: 'Percentage to trigger notifications',
    example: 80,
  })
  @IsNumber()
  notificationThreshold: number;

  // @ApiProperty({
  //   description: 'ID of the user associated with the budget',
  //   example: '123e4567-e89b-12d3-a456-426614174000',
  // })
  // @IsUUID()
  // userId: string;
}
export class UpdateBudgetDto extends PartialType(CreateBudgetDto) {}
export class CheckBudgetDto {
  @ApiProperty({
    description: 'Amount to check against the budget',
    example: 100.0,
  })
  @IsNumber()
  @IsPositive()
  amount: number;
}
