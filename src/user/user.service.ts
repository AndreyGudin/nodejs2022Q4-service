import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DB from 'src/db/db';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private readonly service: DB,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const createdUser = new User({
      login: createUserDto.login,
      password: createUserDto.password,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    });
    return await this.user.save(createdUser);
  }

  async findAll() {
    return await this.user.find();
  }

  findOne(id: string) {
    return this.service.users.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.service.users.update(id, updateUserDto);
  }

  remove(id: string) {
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
