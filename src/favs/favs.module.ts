import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import DB from 'src/db/db';

@Module({
  controllers: [FavsController],
  providers: [FavsService, DB],
})
export class FavsModule {}
