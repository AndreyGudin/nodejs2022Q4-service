import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.artistService.findOne(id);
    if (Object.keys(result).length > 0) return this.artistService.findOne(id);
    else throw new NotFoundException();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const result = this.artistService.update(id, updateArtistDto);
    if (result) return result;
    else throw new NotFoundException();
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.artistService.remove(id);
    if (result) return result;
    else throw new NotFoundException();
  }
}
