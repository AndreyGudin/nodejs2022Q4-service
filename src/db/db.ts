import { Injectable } from '@nestjs/common';
import { AlbumsDB } from './db.albums';

import { ArtistsDB } from './db.artists';
import { FavDB } from './db.favs';
import { TrackDB } from './db.track';
import { UserDB } from './db.user';

@Injectable()
export default class DB {
  users = new UserDB();
  tracks = new TrackDB();
  artists = new ArtistsDB();
  albums = new AlbumsDB();
  favs = new FavDB();
}
