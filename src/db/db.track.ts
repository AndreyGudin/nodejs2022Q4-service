import { randomUUID } from 'crypto';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { Track } from 'src/track/entities/track.entity';
import { InMemoryDatabase } from './db.interface';

export class TrackDB
  implements InMemoryDatabase<Track, CreateTrackDto, UpdateTrackDto>
{
  db: Track[];
  constructor() {
    this.db = [];
  }
  findAll(): Track[] {
    return this.db;
  }
  findOne(id: string): Track {
    const result = this.db.filter((track) => track.id === id)[0];
    console.log('first');
    console.log('result track', result);
    return this.db.filter((track) => track.id === id)[0];
  }
  create(createDTO: CreateTrackDto): Track {
    const created = new Track({
      id: randomUUID(),
      ...createDTO,
    });
    this.db.push(created);
    return created;
  }

  update(id: string, updateDTO: UpdateTrackDto): Track {
    const idToUpdate = this.db.findIndex((track) => track.id === id);
    if (idToUpdate > -1) return Object.assign(this.db[idToUpdate], updateDTO);
    else return;
  }

  delete(id: string): Track {
    const idToDelete = this.db.findIndex((track) => track.id === id);
    if (idToDelete > -1) return this.db.splice(idToDelete, 1)[0];
    else return;
  }
}
