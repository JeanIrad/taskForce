import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Or, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(userDto: CreateUserDto): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({
      where: [{ email: userDto.email }, { username: userDto.username }],
    });
    if (user) throw new UnprocessableEntityException('User already exists');
    userDto.password = await bcrypt.hash(userDto.password, 10);
    const newUser = await this.userRepository.create(userDto);
    await this.userRepository.save(newUser);

    const { password, ...result } = newUser;
    return result;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, userDto: Partial<User>): Promise<Partial<User>> {
    const user = await this.findOne(id);
    const updatedUser = await this.userRepository.save({
      ...user,
      ...userDto,
    });
    const { password, ...result } = updatedUser;
    return result;
  }

  async remove(id: string): Promise<{ message: string }> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { message: `User with ID ${id} deleted` };
  }
}
