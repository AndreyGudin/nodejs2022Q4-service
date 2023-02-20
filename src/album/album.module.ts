import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from './entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
