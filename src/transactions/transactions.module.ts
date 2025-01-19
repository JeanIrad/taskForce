import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionService } from './transactions.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionService],
})
export class TransactionsModule {}
