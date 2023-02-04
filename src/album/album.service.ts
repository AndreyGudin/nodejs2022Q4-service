import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artist/entities/artist.entity';
import DB from 'src/db/db';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly service: DB) {}
  create(createAlbumDto: CreateAlbumDto) {
    let isExist: Artist | boolean = this.service.artists.findOne(
      createAlbumDto.artistId,
    );
    if (createAlbumDto.artistId === null) isExist = true;
    console.log('artistId', createAlbumDto.artistId);
    if (isExist) return this.service.albums.create(createAlbumDto);
    else return;
  }

  findAll() {
    return this.service.albums.findAll();
  }

  findOne(id: string) {
    return this.service.albums.findOne(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.service.albums.update(id, updateAlbumDto);
  }

  remove(id: string) {
    const tracks = this.service.tracks.findAll();
    tracks.forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });
    return this.service.albums.delete(id);
  }
}
