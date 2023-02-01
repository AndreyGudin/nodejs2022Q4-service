import { Injectable } from '@nestjs/common';
import { UserDB } from './db.user';

@Injectable()
export default class DB {
  users = new UserDB();
}
