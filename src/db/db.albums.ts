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
    const result = [...this.db];
    return result;
  }
  findOne(id: string): Album {
    return Object.assign({}, this.db.filter((album) => album.id === id)[0]);
  }
  create(createDTO: CreateAlbumDto): Album {
    return;
  }

  update(id: string, updateDTO: UpdateAlbumDto): Album | undefined {
    const idToUpdate = this.db.findIndex((album) => album.id === id);
    if (idToUpdate > -1) return Object.assign(this.db[idToUpdate], updateDTO);
    else return;
  }

  delete(id: string): Album {
    const idToDelete = this.db.findIndex((album) => album.id === id);
    if (idToDelete > -1) return this.db.splice(idToDelete, 1)[0];
    else return;
  }
}
