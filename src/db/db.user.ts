import { randomUUID } from 'crypto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';
import { InMemoryDatabase } from './db.interface';

export class UserDB
  implements InMemoryDatabase<User, CreateUserDto, UpdateUserDto>
{
  db: User[];
  constructor() {
    this.db = [];
  }
  findAll(): User[] {
    return this.db;
  }
  findOne(id: string): User {
    return this.db.filter((user) => user.id === id)[0];
  }
  create(createDTO: CreateUserDto): User {
    const created = new User({
      id: randomUUID(),
      login: createDTO.login,
      password: createDTO.password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    });
    this.db.push(created);
    return created;
  }

  update(id: string, updateDTO: UpdateUserDto): User {
    const idToUpdate = this.db.findIndex((user) => user.id === id);
    this.db[idToUpdate].password = updateDTO.newPassword;
    return this.db[idToUpdate];
  }

  delete(id: string): User {
    const idToDelete = this.db.findIndex((user) => user.id === id);
    return this.db.splice(idToDelete, 1)[0];
  }
}
