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
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@ApiTags('Альбом')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiResponse({ status: 201, type: Album })
  @ApiResponse({
    status: 400,
    description: 'Invalid body',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const result = await this.albumService.create(createAlbumDto);
    if (result) return result;
    else return '';
  }

  @ApiResponse({ status: 200, type: [Album] })
  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @ApiResponse({ status: 200, type: Album })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid  is expected)',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.albumService.findOne(id);
    if (result) return this.albumService.findOne(id);
    else throw new NotFoundException();
  }

  @ApiResponse({ status: 200, type: Album })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid  is expected)',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const result = await this.albumService.update(id, updateAlbumDto);
    if (result) return result;
    else throw new NotFoundException();
  }

  @ApiResponse({ status: 204, type: Album })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid  is expected)',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.albumService.remove(id);
    if (result) return result;
    else throw new NotFoundException();
  }
}
