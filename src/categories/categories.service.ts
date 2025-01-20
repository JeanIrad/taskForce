import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.dto';
import { Category } from './entities/categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private readonly userService: UsersService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, userId: string) {
    const category = await this.categoryRepository.findOneBy({
      name: createCategoryDto.name,
    });
    if (category) {
      throw new BadRequestException(
        `Category with name ${createCategoryDto.name} already exists`,
      );
    }
    const user = await this.userService.findOne(userId);

    const newCategory = this.categoryRepository.create({
      ...createCategoryDto,
      user,
    });
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(userId: string) {
    await this.userService.findOne(userId);
    return await this.categoryRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findOne(id: string, userId: string) {
    const category = await this.categoryRepository.findOneBy({
      id,
      user: { id: userId },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    userId: string,
  ) {
    await this.userService.findOne(userId);
    const category = await this.categoryRepository.findOne({
      where: { id: id, user: { id: userId } },
    });
    Object.assign(category, updateCategoryDto);
    await this.categoryRepository.save(category);
    return category;
  }

  async remove(id: string, userId: string) {
    const category = await this.categoryRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    this.categoryRepository.remove(category);

    return { message: `Category with ID ${id} deleted` };
  }

  async addSubcategory(
    id: string,
    subcategory: Category,
    userId: string,
  ): Promise<Category> {
    const category = await this.findOne(id, userId);
    category.subcategories = [...category.subcategories, subcategory];
    await this.categoryRepository.save(category);
    return category;
  }

  async removeSubcategory(
    id: string,
    subcategory: Category,
    userId: string,
  ): Promise<Category> {
    const category = await this.findOne(id, userId);
    const index = category.subcategories.indexOf(subcategory);
    if (index === -1) {
      throw new NotFoundException(`Subcategory ${subcategory} not found`);
    }
    category.subcategories.splice(index, 1);
    await this.categoryRepository.save(category);
    return category;
  }
}
