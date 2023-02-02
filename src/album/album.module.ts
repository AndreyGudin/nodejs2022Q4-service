import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import DB from 'src/db/db';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, DB],
})
export class AlbumModule {}
