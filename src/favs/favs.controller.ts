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
import { FindOperator } from 'typeorm';
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
  async createTrack(
    @Param('id', new ParseUUIDPipe())
    id: (string | FindOperator<string>) & (number | FindOperator<number>),
  ) {
    const result = await this.favsService.create(id, 'tracks');
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
  async createAlbum(
    @Param('id', new ParseUUIDPipe())
    id: (string | FindOperator<string>) & (number | FindOperator<number>),
  ) {
    const result = await this.favsService.create(id, 'albums');
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
  async createArtist(
    @Param('id', new ParseUUIDPipe())
    id: (string | FindOperator<string>) & (number | FindOperator<number>),
  ) {
    const result = await this.favsService.create(id, 'artists');
    if (result) return result;
    else
      throw new HttpException(
        'Artist doesnt exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
  }

  @ApiResponse({ status: 200, type: FavoritesResponse })
  @Get()
  async findAll() {
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
  async removeArtist(
    @Param('id', new ParseUUIDPipe())
    id: (string | FindOperator<string>) & (number | FindOperator<number>),
  ) {
    const result = await this.favsService.remove(id, 'artists');
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
  async removeAlbum(
    @Param('id', new ParseUUIDPipe())
    id: (string | FindOperator<string>) & (number | FindOperator<number>),
  ) {
    const result = await this.favsService.remove(id, 'albums');
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
  async removeTrack(
    @Param('id', new ParseUUIDPipe())
    id: (string | FindOperator<string>) & (number | FindOperator<number>),
  ) {
    const result = await this.favsService.remove(id, 'tracks');
    if (result) return result;
    else throw new NotFoundException();
  }
}
