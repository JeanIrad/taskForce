import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto, UpdateAccountDto } from './dto/accounts.dto';

@Injectable()
export class AccountsService {
  private accounts = []; // Replace with database logic.

  create(createAccountDto: CreateAccountDto) {
    const newAccount = { id: Date.now(), ...createAccountDto };
    this.accounts.push(newAccount);
    return newAccount;
  }

  findAll() {
    return this.accounts;
  }

  findOne(id: number) {
    const account = this.accounts.find((acc) => acc.id === id);
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = this.findOne(id);
    Object.assign(account, updateAccountDto);
    return account;
  }

  remove(id: number) {
    const index = this.accounts.findIndex((acc) => acc.id === id);
    if (index === -1) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    this.accounts.splice(index, 1);
    return { message: `Account with ID ${id} deleted` };
  }
}
