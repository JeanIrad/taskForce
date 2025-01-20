import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionService } from './transactions.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transactions.entity';
import { User } from 'src/users/entities/users.entity';
import { Account } from 'src/accounts/entities/accounts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity, User, Account])],
  controllers: [TransactionsController],
  providers: [TransactionService, AuthGuard],
})
export class TransactionsModule {}
