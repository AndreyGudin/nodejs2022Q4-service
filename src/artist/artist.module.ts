import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import DB from 'src/db/db';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, DB],
})
export class ArtistModule {}
