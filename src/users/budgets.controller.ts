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
import { CreateBudgetDto, UpdateBudgetDto } from './dto/budgets.dto';
@ApiTags('Budgets')
@Controller('budgets')
export class BudgetController {
  @Post()
  @ApiOperation({ summary: 'Create a new budget' })
  async create(@Body() createBudgetDto: CreateBudgetDto) {
    return { message: 'Budget created', data: createBudgetDto };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a budget by ID' })
  @ApiParam({
    name: 'id',
    description: 'Budget ID',
    example: '123e4567-e89b-12d3-a456-426614174555',
  })
  async findOne(@Param('id') id: string) {
    return { message: `Budget with ID ${id}`, data: {} };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a budget by ID' })
  @ApiParam({
    name: 'id',
    description: 'Budget ID',
    example: '123e4567-e89b-12d3-a456-426614174555',
  })
  async update(
    @Param('id') id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {
    return { message: `Budget with ID ${id} updated`, data: updateBudgetDto };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a budget by ID' })
  @ApiParam({
    name: 'id',
    description: 'Budget ID',
    example: '123e4567-e89b-12d3-a456-426614174555',
  })
  async remove(@Param('id') id: string) {
    return { message: `Budget with ID ${id} deleted` };
  }
}
