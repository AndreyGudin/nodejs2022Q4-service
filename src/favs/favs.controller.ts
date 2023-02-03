import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('/track/:id')
  createTrack(@Body() createFavDto: CreateFavDto) {
    return this.favsService.create(createFavDto);
  }

  @Post('/album/:id')
  createAlbum(@Body() createFavDto: CreateFavDto) {
    return this.favsService.create(createFavDto);
  }

  @Post('/artist/:id')
  createArtist(@Body() createFavDto: CreateFavDto) {
    return this.favsService.create(createFavDto);
  }

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Delete('/artist/:id')
  removeArtist(@Param('id') id: string) {
    return this.favsService.remove(+id);
  }

  @Delete('/album/:id')
  removeAlbum(@Param('id') id: string) {
    return this.favsService.remove(+id);
  }

  @Delete('/track/:id')
  removeTrack(@Param('id') id: string) {
    return this.favsService.remove(+id);
  }
}
