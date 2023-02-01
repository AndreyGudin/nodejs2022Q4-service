import { Injectable } from '@nestjs/common';

import DB from 'src/db/db';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly service: DB) {}
  create(createTrackDto: CreateTrackDto) {
    return this.service.tracks.create(createTrackDto);
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
