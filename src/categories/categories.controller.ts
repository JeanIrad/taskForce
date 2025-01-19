import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return { message: 'Category created', data: createCategoryDto };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({
    name: 'id',
    description: 'Category ID',
    example: '123e4567-e89b-12d3-a456-426614174222',
  })
  async findOne(@Param('id') id: string) {
    return { message: `Category with ID ${id}`, data: {} };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({
    name: 'id',
    description: 'Category ID',
    example: '123e4567-e89b-12d3-a456-426614174222',
  })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return {
      message: `Category with ID ${id} updated`,
      data: updateCategoryDto,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({
    name: 'id',
    description: 'Category ID',
    example: '123e4567-e89b-12d3-a456-426614174222',
  })
  async remove(@Param('id') id: string) {
    return { message: `Category with ID ${id} deleted` };
  }
}
