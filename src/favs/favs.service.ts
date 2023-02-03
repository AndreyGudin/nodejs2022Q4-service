import { Injectable } from '@nestjs/common';
import DB from 'src/db/db';
import { Fav, FavoritesResponse } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(private readonly service: DB) {}
  create(id: string, key: keyof Fav) {
    const obj = this.service[key].findAll();
    const obj2 = this.service.artists.findAll();
    console.log('obj', obj);
    console.log('obj2', obj2);
    if (obj) return this.service.favs.create(id, key);
    else return;
  }

  findAll(): FavoritesResponse {
    const response: FavoritesResponse = {
      artists: this.service.favs.db.artists.map((id) => {
        return this.service.artists.findOne(id);
      }),
      albums: this.service.favs.db.albums.map((id) => {
        return this.service.albums.findOne(id);
      }),
      tracks: this.service.favs.db.tracks.map((id) => {
        return this.service.tracks.findOne(id);
      }),
    };
    return response;
  }

  remove(id: string, key: keyof Fav) {
    const obj = this.service[key].findOne(id);
    if (obj) return this.service.favs.delete(id, key);
    else return;
  }
}
