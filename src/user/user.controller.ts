import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.usersService.findOne(id);
    if (result) return this.usersService.findOne(id);
    else throw new NotFoundException();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updated = this.usersService.findOne(id);
    if (updated) {
      if (updated.password === updateUserDto.oldPassword)
        return this.usersService.update(id, updateUserDto);
      else throw new ForbiddenException();
    } else throw new NotFoundException();
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.usersService.remove(id);
    if (result) return result;
    else throw new NotFoundException();
  }
}
