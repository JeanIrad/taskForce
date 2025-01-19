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
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from './dto/transactions.dto';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return { message: 'Transaction created', data: createTransactionDto };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a transaction by ID' })
  @ApiParam({
    name: 'id',
    description: 'Transaction ID',
    example: '123e4567-e89b-12d3-a456-426614174333',
  })
  async findOne(@Param('id') id: string) {
    return { message: `Transaction with ID ${id}`, data: {} };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a transaction by ID' })
  @ApiParam({
    name: 'id',
    description: 'Transaction ID',
    example: '123e4567-e89b-12d3-a456-426614174333',
  })
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return {
      message: `Transaction with ID ${id} updated`,
      data: updateTransactionDto,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transaction by ID' })
  @ApiParam({
    name: 'id',
    description: 'Transaction ID',
    example: '123e4567-e89b-12d3-a456-426614174333',
  })
  async remove(@Param('id') id: string) {
    return { message: `Transaction with ID ${id} deleted` };
  }
}
