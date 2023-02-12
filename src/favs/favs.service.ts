import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { FindOperator, Repository } from 'typeorm';
import { Fav } from './entities/fav.entity';

type Reps = {
  artists: Repository<Artist>;
  albums: Repository<Album>;
  tracks: Repository<Track>;
  favs: Repository<Fav>;
};

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artists: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albums: Repository<Album>,
    @InjectRepository(Track)
    private readonly tracks: Repository<Track>,
    @InjectRepository(Fav)
    private readonly favs: Repository<Fav>,
  ) {}
  async create(
    id: (string | FindOperator<string>) & (number | FindOperator<number>),
    key: keyof Reps,
  ) {
    const obj = await this[key].findOne({ where: { id } });
    const fav = await this.favs.findOne({
      where: { id: 0 },
      relations: ['artists', 'albums', 'tracks'],
    });
    if (obj) {
      const isFav = fav[key].findIndex((obj) => obj.id === id);
      if (isFav === -1) {
        fav[key] = [...fav[key], obj];
        return await this.favs.save(fav);
      }
      return 'Already in favorites';
    }
    return;
  }

  async findAll() {
    const result = (
      await this.favs.find({
        relations: ['artists', 'albums', 'tracks'],
      })
    )[0];
    return result;
  }

  async remove(
    id: (string | FindOperator<string>) & (number | FindOperator<number>),
    key: keyof Reps,
  ) {
    const obj = await this[key].findOne({ where: { id } });
    const fav = await this.favs.findOne({
      where: { id: 0 },
      relations: ['artists', 'albums', 'tracks'],
    });
    if (obj) {
      const itToDelete = fav[key].findIndex((obj) => obj.id === id);
      if (itToDelete > -1) {
        fav[key].splice(itToDelete, 1);
        return await this.favs.save(fav);
      }
    }
    return;
  }
}
