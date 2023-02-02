import { randomUUID } from 'crypto';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { Album } from 'src/album/entities/album.entity';
import { InMemoryDatabase } from './db.interface';

export class AlbumsDB
  implements InMemoryDatabase<Album, CreateAlbumDto, UpdateAlbumDto>
{
  db: Album[];
  constructor() {
    this.db = [];
  }
  findAll(): Album[] {
    return this.db;
  }
  findOne(id: string): Album {
    return this.db.filter((album) => album.id === id)[0];
  }
  create(createDTO: CreateAlbumDto): Album {
    const created = new Album({
      id: randomUUID(),
      ...createDTO,
    });
    this.db.push(created);
    return created;
  }

  update(id: string, updateDTO: UpdateAlbumDto): Album {
    const idToUpdate = this.db.findIndex((album) => album.id === id);
    return Object.assign(this.db[idToUpdate], updateDTO);
  }

  delete(id: string): Album {
    const idToDelete = this.db.findIndex((album) => album.id === id);
    return this.db.splice(idToDelete, 1)[0];
  }
}
