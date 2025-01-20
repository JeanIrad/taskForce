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
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  async create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: any) {
    return this.categoryService.create(createCategoryDto, req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({
    name: 'id',
    description: 'Category ID',
    example: '123e4567-e89b-12d3-a456-426614174222',
  })
  async findOne(@Param('id') id: string, @Req() req: any) {
    return this.categoryService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({
    name: 'id',
    description: 'Category ID',
    example: '123e4567-e89b-12d3-a456-426614174222',
  })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req: any,
  ) {
    return this.categoryService.update(id, updateCategoryDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({
    name: 'id',
    description: 'Category ID',
    example: '123e4567-e89b-12d3-a456-426614174222',
  })
  async remove(@Param('id') id: string, @Req() req: any) {
    return this.categoryService.remove(id, req.user.id);
  }
}
