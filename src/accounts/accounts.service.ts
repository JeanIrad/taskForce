import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto, UpdateAccountDto } from './dto/accounts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/accounts.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    private readonly userService: UsersService,
  ) {}

  async create(createAccountDto: CreateAccountDto, userId: string) {
    const user = await this.userService.findOne(userId);

    const account = this.accountRepository.create({
      ...createAccountDto,
      user,
    });
    return this.accountRepository.save(account);
  }

  async findAll(userId: string) {
    const user = await this.userService.findOne(userId);
    return await this.accountRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findOne(id: string, userId: string) {
    const user = await this.userService.findOne(userId);
    const account = await this.accountRepository.findOneBy({ id, user });
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto, userId: string) {
    await this.userService.findOne(userId);
    const account = await this.findOne(id, userId);
    Object.assign(account, updateAccountDto);
    await this.accountRepository.save(account);

    return account;
  }

  async remove(id: string, userId: string) {
    await this.userService.findOne(userId);
    const account = await this.findOne(id, userId);
    await this.accountRepository.remove(account);
    return { message: `Account with ID ${id} deleted` };
  }
}
