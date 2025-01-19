import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateAccountDto, UpdateAccountDto } from './dto/accounts.dto';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  async create(@Body() createAccountDto: CreateAccountDto) {
    return { message: 'Account created', data: createAccountDto };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an account by ID' })
  @ApiParam({
    name: 'id',
    description: 'Account ID',
    example: '123e4567-e89b-12d3-a456-426614174111',
  })
  async findOne(@Param('id') id: string) {
    return { message: `Account with ID ${id}`, data: {} };
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
  ) {
    return { message: `Account with ID ${id} updated`, data: updateAccountDto };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an account by ID' })
  @ApiParam({
    name: 'id',
    description: 'Account ID',
    example: '123e4567-e89b-12d3-a456-426614174111',
  })
  async remove(@Param('id') id: string) {
    return { message: `Account with ID ${id} deleted` };
  }
}
