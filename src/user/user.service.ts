import { Injectable } from '@nestjs/common';
import DB from 'src/db/db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly service: DB) {}
  create(createUserDto: CreateUserDto) {
    return this.service.users.create(createUserDto);
  }

  findAll() {
    return this.service.users.findAll();
  }

  findOne(id: string) {
    return this.service.users.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.service.users.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.service.users.delete(id);
  }
}
