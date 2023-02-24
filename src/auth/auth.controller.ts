import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }

  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto) {
    return await this.authService.login(createUserDto);
  }
}
