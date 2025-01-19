import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.dto';
import { Category } from './entities/categories.entity';
@Injectable()
export class CategoriesService {
  private categories = []; // Replace with database logic.

  create(createCategoryDto: CreateCategoryDto) {
    const newCategory = { id: Date.now(), ...createCategoryDto };
    this.categories.push(newCategory);
    return newCategory;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((cat) => cat.id === id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.findOne(id);
    Object.assign(category, updateCategoryDto);
    return category;
  }

  remove(id: number) {
    const index = this.categories.findIndex((cat) => cat.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    this.categories.splice(index, 1);
    return { message: `Category with ID ${id} deleted` };
  }

  addSubcategory(id: number, subcategory: string): Category {
    const category = this.findOne(id);
    category.subcategories.push(subcategory);
    return category;
  }

  removeSubcategory(id: number, subcategory: string): Category {
    const category = this.findOne(id);
    const index = category.subcategories.indexOf(subcategory);
    if (index === -1) {
      throw new NotFoundException(`Subcategory ${subcategory} not found`);
    }
    category.subcategories.splice(index, 1);
    return category;
  }
}
