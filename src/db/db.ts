import { randomUUID } from 'node:crypto';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';

export class InMemoryDatabase {
  db: User[];
  constructor(db: User[]) {
    this.db = db;
  }
  create(createDto: CreateUserDto): User {
    const user: User = {
      id: randomUUID(),
      login: createDto.login,
      password: createDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.db.push(user);
    return user;
  }

  findAll(): User[] {
    return this.db;
  }

  findOne(id: string): User {
    return this.db.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const idOfUser = this.db.findIndex((user) => user.id === id);
    if (updateUserDto.oldPassword === this.db[idOfUser].password)
      Object.assign(this.db[idOfUser], updateUserDto);
    return this.db[idOfUser];
  }
}
