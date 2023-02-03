import { randomUUID } from 'crypto';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { InMemoryDatabase } from './db.interface';

export class ArtistsDB
  implements InMemoryDatabase<Artist, CreateArtistDto, UpdateArtistDto>
{
  db: Artist[];
  constructor() {
    this.db = [];
  }
  findAll(): Artist[] {
    return this.db;
  }
  findOne(id: string): Artist {
    return this.db.filter((artist) => artist.id === id)[0];
  }
  create(createDTO: CreateArtistDto): Artist {
    const created = new Artist({
      id: randomUUID(),
      ...createDTO,
    });
    this.db.push(created);
    return created;
  }

  update(id: string, updateDTO: UpdateArtistDto): Artist {
    const idToUpdate = this.db.findIndex((artist) => artist.id === id);
    return Object.assign(this.db[idToUpdate], updateDTO);
  }

  delete(id: string): Artist {
    const idToDelete = this.db.findIndex((artist) => artist.id === id);
    if (idToDelete > -1) return this.db.splice(idToDelete, 1)[0];
    else return;
  }
}
