import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AccountsModule } from './accounts/accounts.module';
import { CategoriesModule } from './categories/categories.module';
import { DbModule } from './db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datSourceOptions } from './db/data-source';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(datSourceOptions),
    UsersModule,
    TransactionsModule,
    AccountsModule,
    CategoriesModule,
    DbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
