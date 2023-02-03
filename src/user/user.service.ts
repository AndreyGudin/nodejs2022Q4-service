import { Injectable } from '@nestjs/common';
import DB from 'src/db/db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly service: DB) {}
  create(createUserDto: CreateUserDto) {
    return this.service.users.create(createUserDto);
  }

  findAll() {
    const obj = this.service.artists.findAll();
    console.log('obj', obj);
    return this.service.users.findAll();
  }

  findOne(id: string) {
    return this.service.users.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.service.users.update(id, updateUserDto);
  }

  remove(id: string): User | undefined {
    const tracks = this.service.tracks.findAll();
    const albums = this.service.albums.findAll();
    tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });
    albums.forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });
    return this.service.users.delete(id);
  }
}
