import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsDate, IsUUID } from 'class-validator';

export class CreateBudgetDto {
  @ApiProperty({ description: 'Total budget amount', example: 5000.0 })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Start date of the budget period',
    example: '2024-01-01',
  })
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: 'End date of the budget period',
    example: '2024-01-31',
  })
  @IsDate()
  endDate: Date;

  @ApiProperty({
    description: 'Percentage to trigger notifications',
    example: 80,
  })
  @IsNumber()
  notificationThreshold: number;

  @ApiProperty({
    description: 'ID of the user associated with the budget',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  userId: string;
}
export class UpdateBudgetDto extends PartialType(CreateBudgetDto) {}
