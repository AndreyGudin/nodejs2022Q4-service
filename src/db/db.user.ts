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
    const result = [...this.db];
    return result;
  }
  findOne(id: string): User {
    return this.db.filter((user) => user.id === id)[0];
  }
  create(createDTO: CreateUserDto): User {
    const created = new User({
      id: randomUUID(),
      login: createDTO.login,
      password: createDTO.password,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    });
    this.db.push(created);
    return created;
  }

  update(id: string, updateDTO: UpdateUserDto): User {
    const idToUpdate = this.db.findIndex((user) => user.id === id);
    this.db[idToUpdate].password = updateDTO.newPassword;
    this.db[idToUpdate].version += 1;
    this.db[idToUpdate].updatedAt = new Date();
    return this.db[idToUpdate];
  }

  delete(id: string): User | undefined {
    const idToDelete = this.db.findIndex((user) => user.id === id);
    if (idToDelete > -1) return this.db.splice(idToDelete, 1)[0];
    else return;
  }
}
