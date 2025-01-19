import { Transaction } from 'src/transactions/entities/transactions.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.categories, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Category, (category) => category.subcategories, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  subcategories: Category[];

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;
}
