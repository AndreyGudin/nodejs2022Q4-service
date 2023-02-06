import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import DB from 'src/db/db';
import { Track } from 'src/track/entities/track.entity';
import { Fav, FavoritesResponse } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(private readonly service: DB) {}
  create(id: string, key: keyof Fav) {
    const obj = this.service[key].findOne(id);
    console.log('obj', obj);
    if (Object.keys(obj).length > 0) return this.service.favs.create(id, key);
    else return;
  }

  findAll(): FavoritesResponse {
    const response: FavoritesResponse = {
      artists: this.service.favs.db.artists.map((id) => {
        const isExist = this.service.artists.findOne(id);
        if (isExist) return Object.assign({}, this.service.artists.findOne(id));
      }),
      albums: this.service.favs.db.albums.map((id) => {
        const isExist = this.service.albums.findOne(id);
        if (isExist) return Object.assign({}, this.service.albums.findOne(id));
      }),
      tracks: this.service.favs.db.tracks.map((id) => {
        const isExist = this.service.tracks.findOne(id);
        if (isExist) return Object.assign({}, this.service.tracks.findOne(id));
      }),
    };
    return response;
  }

  remove(id: string, key: keyof Fav) {
    const obj = this.service.favs.db[key].find(
      (idToDelete) => idToDelete === id,
    );
    if (obj) return this.service.favs.delete(id, key);
    else return;
  }
}
