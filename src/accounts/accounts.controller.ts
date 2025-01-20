import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateAccountDto, UpdateAccountDto } from './dto/accounts.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AccountsService } from './accounts.service';
import { Request } from 'express';

@ApiTags('Accounts')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  async create(@Body() createAccountDto: CreateAccountDto, @Req() req: any) {
    return this.accountService.create(createAccountDto, req.user.id);
  }
  @Get()
  @ApiOperation({ summary: 'Get all accounts' })
  async findAll(@Req() req: any) {
    return this.accountService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an account by ID' })
  @ApiParam({
    name: 'id',
    description: 'Account ID',
    example: '123e4567-e89b-12d3-a456-426614174111',
  })
  async findOne(@Param('id') id: string, @Req() req: any) {
    return this.accountService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an account by ID' })
  @ApiParam({
    name: 'id',
    description: 'Account ID',
    example: '123e4567-e89b-12d3-a456-426614174111',
  })
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
    @Req() req: any,
  ) {
    return this.accountService.update(id, updateAccountDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an account by ID' })
  @ApiParam({
    name: 'id',
    description: 'Account ID',
    example: '123e4567-e89b-12d3-a456-426614174111',
  })
  async remove(@Param('id') id: string, @Req() req: any) {
    return this.accountService.remove(id, req.user.id);
  }
}
