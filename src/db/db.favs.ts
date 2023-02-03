import { Fav } from 'src/favs/entities/fav.entity';

export class FavDB {
  db: Fav = {
    albums: [],
    tracks: [],
    artists: [],
  };
  constructor() {
    this.db.albums = [];
    this.db.tracks = [];
    this.db.artists = [];
  }
  findAll(): Fav {
    return this.db;
  }

  create(id: string, key: keyof Fav): string {
    this.db[key].push(id);
    return id;
  }

  delete(id: string, key: keyof Fav): string {
    const idToDelete = this.db[key].findIndex((trackId) => trackId === id);
    if (idToDelete > -1) return this.db[key].splice(idToDelete, 1)[0];
    else return;
  }
}
