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
    return Object.assign(this.db[idToUpdate], updateDTO);
  }

  delete(id: string): Track {
    const idToDelete = this.db.findIndex((track) => track.id === id);
    return this.db.splice(idToDelete, 1)[0];
  }
}
