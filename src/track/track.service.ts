import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import DB from 'src/db/db';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Artist)
    private readonly artist: Repository<Artist>,
    @InjectRepository(Album)
    private readonly album: Repository<Album>,
    @InjectRepository(Album)
    private readonly track: Repository<Track>,
    private readonly service: DB,
  ) {}
  create(createTrackDto: CreateTrackDto) {
    let isArtistExist: Artist | boolean = this.service.artists.findOne(
      createTrackDto.artistId,
    );
    let isAlbumExist: Album | boolean = this.service.albums.findOne(
      createTrackDto.albumId,
    );
    if (createTrackDto.artistId === null) isArtistExist = true;
    if (createTrackDto.albumId === null) isAlbumExist = true;
    if (isArtistExist && isAlbumExist)
      return this.service.tracks.create(createTrackDto);
    else return;
  }

  findAll() {
    return this.service.tracks.findAll();
  }

  findOne(id: string) {
    return this.service.tracks.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.service.tracks.update(id, updateTrackDto);
  }

  remove(id: string) {
    return this.service.tracks.delete(id);
  }
}
