import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Account } from 'src/accounts/entities/accounts.entity';
import { Category } from 'src/categories/entities/categories.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column()
  type: string; // "income" or "expense"

  @Column()
  description: string;

  @ManyToOne(() => Account, (account) => account.transactions, {
    onDelete: 'CASCADE',
  })
  account: Account;

  @ManyToOne(() => Category, (category) => category.transactions, {
    onDelete: 'SET NULL',
  })
  category: Category;

  @Column()
  transactionDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
