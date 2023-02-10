import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const createdUser = new User({
      login: createUserDto.login,
      password: createUserDto.password,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    });
    return await this.user.save(createdUser);
  }

  async findAll() {
    return await this.user.find();
  }

  async findOne(id: string) {
    const user = await this.user.findOne({ where: { id } });
    if (user) return user;
    return;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.user.findOne({ where: { id } });
    if (user) {
      user.password = updateUserDto.newPassword;
      user.version += 1;
      user.updatedAt = new Date();
      return await this.user.save(user);
    }
    return;
  }

  async remove(id: string) {
    const result = await this.user.delete(id);
    if (result.affected === 0) return;
    return id;
  }
}
