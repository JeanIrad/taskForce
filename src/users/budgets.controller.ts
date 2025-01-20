import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CheckBudgetDto,
  CreateBudgetDto,
  UpdateBudgetDto,
} from './dto/budgets.dto';
import { BudgetsService } from './budgets.service';
import { AuthGuard } from 'src/guards/auth.guard';
@ApiTags('Budgets')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('budgets')
export class BudgetController {
  constructor(private readonly budgetService: BudgetsService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new budget' })
  async create(@Body() createBudgetDto: CreateBudgetDto, @Req() req: any) {
    return this.budgetService.create(createBudgetDto, req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a budget by ID' })
  @ApiParam({
    name: 'id',
    description: 'Budget ID',
    example: '123e4567-e89b-12d3-a456-426614174555',
  })
  async findOne(@Param('id') id: string, @Req() req: any) {
    return this.budgetService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a budget by ID' })
  @ApiParam({
    name: 'id',
    description: 'Budget ID',
    example: '123e4567-e89b-12d3-a456-426614174555',
  })
  async update(
    @Param('id') id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
    @Req() req: any,
  ) {
    return this.budgetService.update(id, updateBudgetDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a budget by ID' })
  @ApiParam({
    name: 'id',
    description: 'Budget ID',
    example: '123e4567-e89b-12d3-a456-426614174555',
  })
  async remove(@Param('id') id: string, @Req() req: any) {
    return this.budgetService.remove(id, req.user.id);
  }

  @Post('check-budget/:budgetId')
  @ApiOperation({ summary: 'Check if a budget is exceeded' })
  async checkBudget(
    @Body() dto: CheckBudgetDto,
    @Param('budgetId', ParseUUIDPipe) budgetId: string,
    @Req() req: any,
  ) {
    return this.budgetService.isBudgetGreatThanExpense(
      budgetId,
      dto.amount,
      req.user.id,
    );
  }
}
