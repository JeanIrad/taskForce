import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto, UpdateBudgetDto } from './dto/budgets.dto';

@Injectable()
export class BudgetsService {
  private budgets = [];

  create(createBudgetDto: CreateBudgetDto) {
    const newBudget = { id: Date.now(), ...createBudgetDto };
    this.budgets.push(newBudget);
    return newBudget;
  }

  findAll() {
    return this.budgets;
  }

  findOne(id: number) {
    const budget = this.budgets.find((bgt) => bgt.id === id);
    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
    return budget;
  }

  update(id: number, updateBudgetDto: UpdateBudgetDto) {
    const budget = this.findOne(id);
    Object.assign(budget, updateBudgetDto);
    return budget;
  }

  remove(id: number) {
    const index = this.budgets.findIndex((bgt) => bgt.id === id);
    if (index === -1) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
    this.budgets.splice(index, 1);
    return { message: `Budget with ID ${id} deleted` };
  }

  checkBudget(budgetId: number, expense: number): boolean {
    const budget = this.findOne(budgetId);
    return expense > budget.limit;
  }
}
