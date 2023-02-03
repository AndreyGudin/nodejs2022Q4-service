import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('/track/:id')
  createTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.create(id, 'tracks');
    if (result) return result;
    else throw new NotFoundException();
  }

  @Post('/album/:id')
  createAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.create(id, 'albums');
    if (result) return result;
    else throw new NotFoundException();
  }

  @Post('/artist/:id')
  createArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.create(id, 'artists');
    if (result) return result;
    else throw new NotFoundException();
  }

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Delete('/artist/:id')
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.remove(id, 'artists');
    if (result) return result;
    else throw new NotFoundException();
  }

  @Delete('/album/:id')
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.remove(id, 'albums');
    if (result) return result;
    else throw new NotFoundException();
  }

  @Delete('/track/:id')
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.remove(id, 'tracks');
    if (result) return result;
    else throw new NotFoundException();
  }
}
