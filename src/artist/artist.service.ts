import { Injectable } from '@nestjs/common';
import DB from 'src/db/db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly service: DB) {}
  create(createArtistDto: CreateArtistDto) {
    return this.service.artists.create(createArtistDto);
  }

  findAll() {
    return this.service.artists.findAll();
  }

  findOne(id: string) {
    return this.service.artists.findOne(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.service.artists.update(id, updateArtistDto);
  }

  remove(id: string) {
    return this.service.artists.delete(id);
  }
}
