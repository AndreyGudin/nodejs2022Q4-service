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
    const result = JSON.parse(JSON.stringify(this.db));
    return result;
  }

  create(id: string, key: keyof Fav): string {
    this.db[key].push(id);
    return id;
  }

  delete(id: string, key: keyof Fav): string {
    const idToDelete = this.db[key].findIndex((trackId) => trackId === id);
    const result = this.db[key].splice(idToDelete, 1)[0];
    if (idToDelete > -1) return result;
    else return;
  }
}
