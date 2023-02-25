import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, type: User })
  @ApiResponse({
    status: 400,
    description: 'Invalid body',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.signUp(createUserDto);
    if (result) return result;
    return 'User already exist';
  }

  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto) {
    return await this.authService.login(createUserDto);
  }

  @Post('/refresh')
  refresh(@Body() { refreshToken }: RefreshTokenDto) {
    const result = this.authService.refresh(refreshToken);
    console.log('result', result);
    if ('token' in result) return result;
    throw new ForbiddenException({ message: result });
  }
}
