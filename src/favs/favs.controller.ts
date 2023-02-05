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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Track } from 'src/track/entities/track.entity';
import { Fav, FavoritesResponse } from './entities/fav.entity';
import { FavsService } from './favs.service';

@ApiTags('Избранное')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}
  @ApiResponse({ status: 201, type: String })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid  is expected)',
  })
  @ApiResponse({ status: 422, description: 'Not Found' })
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
  @ApiResponse({ status: 201, type: String })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid  is expected)',
  })
  @ApiResponse({ status: 422, description: 'Not Found' })
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
  @ApiResponse({ status: 201, type: String })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid  is expected)',
  })
  @ApiResponse({ status: 422, description: 'Not Found' })
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

  @ApiResponse({ status: 200, type: FavoritesResponse })
  @Get()
  findAll() {
    return this.favsService.findAll();
  }
  @ApiResponse({ status: 204 })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid  is expected)',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.remove(id, 'artists');
    if (result) return result;
    else throw new NotFoundException();
  }
  @ApiResponse({ status: 204 })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid  is expected)',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.remove(id, 'albums');
    if (result) return result;
    else throw new NotFoundException();
  }
  @ApiResponse({ status: 204 })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid  is expected)',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.remove(id, 'tracks');
    if (result) return result;
    else throw new NotFoundException();
  }
}
