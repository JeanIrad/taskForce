import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { BudgetController } from './budgets.controller';
import { BudgetsService } from './budgets.service';

@Module({
  controllers: [UsersController, BudgetController],
  providers: [BudgetsService],
})
export class UsersModule {}
