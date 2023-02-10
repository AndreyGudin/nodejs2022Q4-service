import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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
    @InjectRepository(Track)
    private readonly track: Repository<Track>,
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    const track: Track = {} as Track;
    if (createTrackDto.albumId === null) {
      track.albumId = null;
    } else {
      const album = await this.album.findOne({
        where: { id: createTrackDto.albumId },
      });
      if (album) track.albumId = album.id;
      else return;
    }
    if (createTrackDto.artistId === null) {
      track.artistId = null;
    } else {
      const artist = await this.artist.findOne({
        where: { id: createTrackDto.artistId },
      });
      if (artist) track.artistId = artist.id;
      else return;
    }
    track.duration = createTrackDto.duration;
    track.name = createTrackDto.name;
    return await this.track.save(track);
  }

  async findAll() {
    return await this.track.find({
      relations: ['albumId'],
      loadRelationIds: true,
    });
  }

  async findOne(id: string) {
    const track = await this.track.findOne({
      where: { id },
      relations: ['artistId', 'albumId'],
      loadRelationIds: true,
    });
    console.log('track', track);
    if (track) return track;
    return;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.track.findOne({ where: { id } });
    if (track) {
      Object.assign(track, updateTrackDto);
      return await this.track.save(track);
    }
    return;
  }

  async remove(id: string) {
    const result = await this.track.delete(id);
    if (result.affected === 0) return;
    return id;
  }
}
