import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('/track/:id')
  createTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.create(id, 'tracks');
    if (result) return result;
    else
      throw new HttpException(
        'Track doesnt exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
  }

  @Post('/album/:id')
  createAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.create(id, 'albums');
    if (result) return result;
    else
      throw new HttpException(
        'Album doesnt exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
  }

  @Post('/artist/:id')
  createArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.create(id, 'artists');
    if (result) return result;
    else
      throw new HttpException(
        'Artist doesnt exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
  }

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.remove(id, 'artists');
    if (result) return result;
    else throw new NotFoundException();
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.remove(id, 'albums');
    if (result) return result;
    else throw new NotFoundException();
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.remove(id, 'tracks');
    if (result) return result;
    else throw new NotFoundException();
  }
}
