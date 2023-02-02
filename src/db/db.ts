import { Injectable } from '@nestjs/common';

import { ArtistsDB } from './db.artists';
import { TrackDB } from './db.track';
import { UserDB } from './db.user';

@Injectable()
export default class DB {
  users = new UserDB();
  tracks = new TrackDB();
  artists = new ArtistsDB();
}
