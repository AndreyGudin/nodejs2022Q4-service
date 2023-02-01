import { Injectable } from '@nestjs/common';
import { UserDB } from './db.users';

@Injectable()
export default class DB {
  users = new UserDB();
}
