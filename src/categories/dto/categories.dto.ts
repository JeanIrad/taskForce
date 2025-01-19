import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Name of the category', example: 'Utilities' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'ID of the user who owns the category',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Parent category ID (if it is a subcategory)',
    example: '123e4567-e89b-12d3-a456-426614174222',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  parentId?: string;
}
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
