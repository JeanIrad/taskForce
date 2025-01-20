import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBudgetDto, UpdateBudgetDto } from './dto/budgets.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from './entities/budgets.entity';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(Budget) private budgetRepository: Repository<Budget>,
    private readonly userService: UsersService,
  ) {}

  async create(createBudgetDto: CreateBudgetDto, userId: string) {
    const user = await this.userService.findOne(userId);
    if (createBudgetDto.startDate > createBudgetDto.endDate) {
      throw new BadRequestException(
        'Start date cannot be greater than end date',
      );
    }
    if (createBudgetDto.amount <= 0) {
      throw new BadRequestException('Budget amount must be greater than 0');
    }
    if (createBudgetDto.notificationThreshold <= 0) {
      throw new BadRequestException(
        'Notification threshold must be greater than 0',
      );
    }
    if (createBudgetDto.startDate < new Date()) {
      throw new BadRequestException('Start date cannot be in the past');
    }
    if (createBudgetDto.endDate < new Date()) {
      throw new BadRequestException('End date cannot be in the past');
    }
    const newBudget = this.budgetRepository.create({
      ...createBudgetDto,
      user,
    });
    return await this.budgetRepository.save(newBudget);
  }

  async findAll(userId: string) {
    await this.userService.findOne(userId);
    return await this.budgetRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findOne(id: string, userId: string) {
    const user = await this.userService.findOne(userId);
    const budget = this.budgetRepository.findOne({ where: { id, user } });
    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
    return budget;
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto, userId: string) {
    const budget = await this.findOne(id, userId);
    Object.assign(budget, updateBudgetDto);
    await this.budgetRepository.save(budget);

    return budget;
  }

  async remove(id: string, userId: string) {
    const budget = await this.findOne(id, userId);
    await this.budgetRepository.remove(budget);

    return { message: `Budget with ID ${id} deleted` };
  }

  async isBudgetGreatThanExpense(
    budgetId: string,
    expense: number,
    userId: string,
  ): Promise<boolean> {
    const budget = await this.findOne(budgetId, userId);
    return expense > budget.amount;
  }
}
