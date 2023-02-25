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
  UseGuards,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Track } from './entities/track.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Треки')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiResponse({ status: 201, type: Track })
  @ApiResponse({
    status: 400,
    description: 'Invalid body',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    const result = await this.trackService.create(createTrackDto);
    if (result) return result;
    else return '';
  }

  @ApiResponse({ status: 200, type: [Track] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @ApiResponse({ status: 200, type: Track })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid  is expected)',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.trackService.findOne(id);
    console.log('result', result);
    if (result) return result;
    else throw new NotFoundException();
  }

  @ApiResponse({ status: 200, type: Track })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid  is expected)',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const result = await this.trackService.update(id, updateTrackDto);
    if (result) return result;
    else throw new NotFoundException();
  }

  @ApiResponse({ status: 204, type: Track })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (uuid  is expected)',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.trackService.remove(id);
    if (result) return result;
    else throw new NotFoundException();
  }
}
