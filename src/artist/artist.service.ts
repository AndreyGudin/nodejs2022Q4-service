import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DB from 'src/db/db';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artist: Repository<Artist>,
    private readonly service: DB,
  ) {}
  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artist.create(createArtistDto);
    return await this.artist.save(artist);
  }

  async findAll() {
    return await this.artist.find();
  }

  async findOne(id: string) {
    const artist = await this.artist.findOne({ where: { id } });
    if (artist) return artist;
    return;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artist.findOne({ where: { id } });
    if (artist) {
      Object.assign(artist, updateArtistDto);
      return await this.artist.save(artist);
    }
    return;
  }

  async remove(id: string) {
    const result = await this.artist.delete(id);
    if (result.affected === 0) return;
    return id;
  }
}
