import { Injectable } from '@nestjs/common';

import { TrackDB } from './db.track';
import { UserDB } from './db.user';

@Injectable()
export default class DB {
  users = new UserDB();
  tracks = new TrackDB();
}
