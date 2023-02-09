import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import DB from 'src/db/db';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Artist)
    private readonly artist: Repository<Artist>,
    @InjectRepository(Album)
    private readonly album: Repository<Album>,
  ) {}
  async create(createAlbumDto: CreateAlbumDto) {
    console.log('createAlbumDto', createAlbumDto);
    if (createAlbumDto.artistId === null) {
      const newAlbum = new Album({
        name: createAlbumDto.name,
        artistId: null,
        year: createAlbumDto.year,
      });
      console.log('null');
      return await this.album.save(newAlbum);
    }
    const artist: Artist = await this.artist.findOne({
      where: { id: createAlbumDto.artistId },
    });
    console.log('createAlbumDto.artistId', createAlbumDto.artistId);
    if (artist) {
      const newAlbum = new Album({
        name: createAlbumDto.name,
        artistId: artist.id,
        year: createAlbumDto.year,
      });

      return await this.album.save(newAlbum);
    }
    return;
  }

  async findAll() {
    return await this.album.find({
      relations: ['artistId'],
      loadRelationIds: true,
    });
  }

  async findOne(id: string) {
    const album = await this.album.findOne({
      where: { id },
      relations: ['artistId'],
      loadRelationIds: true,
    });
    if (album) return album;
    return;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.album.findOne({ where: { id } });
    if (album) {
      Object.assign(album, updateAlbumDto);
      return await this.album.save(album);
    }
    return;
  }

  async remove(id: string) {
    const result = await this.album.delete(id);
    if (result.affected === 0) return;
    return id;
  }
}
