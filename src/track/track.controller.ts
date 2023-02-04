import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseUUIDPipe,
  Put,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    const result = this.trackService.create(createTrackDto);
    if (result) return result;
    else return '';
  }
  @Get()
  findAll() {
    return this.trackService.findAll();
  }
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.trackService.findOne(id);
    if (result) return this.trackService.findOne(id);
    else throw new NotFoundException();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const result = this.trackService.update(id, updateTrackDto);
    if (result) return result;
    else throw new NotFoundException();
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.trackService.remove(id);
    if (result) return result;
    else throw new NotFoundException();
  }
}
