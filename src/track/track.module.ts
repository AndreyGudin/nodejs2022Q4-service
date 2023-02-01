import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import DB from 'src/db/db';

@Module({
  controllers: [TrackController],
  providers: [TrackService, DB],
})
export class TrackModule {}
