import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from './dto/transactions.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { TransactionService } from './transactions.service';

@ApiTags('Transactions')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionService) {}
  @Post('/:accountId')
  @ApiOperation({ summary: 'Create a new transaction' })
  async create(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req: any,
  ) {
    return this.transactionService.create({
      createTransactionDto,
      accountId,
      userId: req.user.id,
    });
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

  @ApiOperation({ summary: 'Get all transactions' })
  @Get()
  async findAll(@Req() req: any) {
    return this.transactionService.findAll(req.user.id);
  }

  @ApiOperation({ summary: 'Get all transactions by account ID' })
  @Get('account/:accountId')
  async findTransactionsByAccount(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Req() req: any,
  ) {
    return this.transactionService.findTransactionsByAccount(
      accountId,
      req.user.id,
    );
  }

  @ApiOperation({ summary: 'Get all transactions by date range' })
  @Get('date-range/:startDate/:endDate')
  async findTransactionsByDateRange(
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
    @Req() req: any,
  ) {
    return this.transactionService.findTransactionsByDateRange(
      startDate,
      endDate,
      req.user.id,
    );
  }
}
