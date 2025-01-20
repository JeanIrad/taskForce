import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { BudgetController } from './budgets.controller';
import { BudgetsService } from './budgets.service';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Budget } from './entities/budgets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Budget])],
  controllers: [UsersController, BudgetController],
  providers: [BudgetsService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
