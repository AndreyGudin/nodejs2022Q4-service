import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import DB from 'src/db/db';

@Module({
  controllers: [UserController],
  providers: [UserService, DB],
})
export class UserModule {}
