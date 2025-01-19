import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from './dto/transactions.dto';
import { Transaction } from './entities/transactions.entity';

@Injectable()
export class TransactionService {
  private transactions = []; // Replace with database logic.

  create(createTransactionDto: CreateTransactionDto) {
    const newTransaction = { id: Date.now(), ...createTransactionDto };
    this.transactions.push(newTransaction);
    return newTransaction;
  }

  findOne(id: number) {
    const transaction = this.transactions.find((txn) => txn.id === id);
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = this.findOne(id);
    Object.assign(transaction, updateTransactionDto);
    return transaction;
  }
  findAll(): Transaction[] {
    return this.transactions;
  }
  findByAccount(accountId: string): Transaction[] {
    return this.transactions.filter((txn) => txn.accountId === accountId);
  }
  findByDateRange(startDate: Date, endDate: Date): Transaction[] {
    return this.transactions.filter(
      (txn) => txn.date >= startDate && txn.date <= endDate,
    );
  }
  remove(id: number) {
    const index = this.transactions.findIndex((txn) => txn.id === id);
    if (index === -1) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    this.transactions.splice(index, 1);
    return { message: `Transaction with ID ${id} deleted` };
  }

  calculateSummary(): { income: number; expenses: number; balance: number } {
    const income = this.transactions
      .filter((txn) => txn.type === 'IN')
      .reduce((sum, txn) => sum + txn.amount, 0);

    const expenses = this.transactions
      .filter((txn) => txn.type === 'OUT')
      .reduce((sum, txn) => sum + txn.amount, 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }
}
