import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from './dto/transactions.dto';
import { TransactionEntity } from './entities/transactions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Account } from 'src/accounts/entities/accounts.entity';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create({
    createTransactionDto,
    accountId,
    userId,
  }: {
    createTransactionDto: CreateTransactionDto;
    accountId: string;
    userId: string;
  }) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const account = await this.accountRepository.findOne({
      where: { id: accountId, user: { id: userId } },
    });
    if (!account)
      throw new NotFoundException(`Account with ID ${accountId} not found`);

    const transactionType = createTransactionDto.type;
    if (transactionType === 'expense' && createTransactionDto.amount > 0) {
      if (account.balance < createTransactionDto.amount) {
        throw new BadRequestException(`Insufficient funds`);
      }
      account.balance -= createTransactionDto.amount;
    } else if (
      transactionType === 'income' &&
      createTransactionDto.amount > 0
    ) {
      account.balance += createTransactionDto.amount;
    }
    await this.accountRepository.save(account);
    const newTransaction = this.transactionRepository.create({
      ...createTransactionDto,
      account,
    });
    return this.transactionRepository.save(newTransaction);
  }
  async findOne(id: string, userId: string) {
    const transaction = await this.transactionRepository.findOne({
      where: { id, account: { user: { id: userId } } },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
    userId: string,
  ) {
    const transaction = await this.findOne(id, userId);
    Object.assign(transaction, updateTransactionDto);
    return this.transactionRepository.save(transaction);
  }
  async findAll(userId: string) {
    return this.transactionRepository.find({
      where: { account: { user: { id: userId } } },
      relations: ['account', 'account.user', 'category'],
    });
  }

  async remove(id: string, userId: string) {
    const transaction = await this.findOne(id, userId);
    await this.transactionRepository.remove(transaction);
    return { message: `Transaction with ID ${id} deleted` };
  }
  async findTransactionsByAccount(accountId: string, userId: string) {
    return this.transactionRepository.find({
      where: { account: { id: accountId, user: { id: userId } } },
      relations: ['account', 'account.user', 'category'],
    });
  }
  async findTransactionsByDateRange(
    startDate: Date,
    endDate: Date,
    userId: string,
  ) {
    return this.transactionRepository.find({
      where: {
        account: { user: { id: userId } },
        transactionDate: Between(startDate, endDate),
      },
      relations: ['account', 'account.user', 'category'],
    });
  }
}
