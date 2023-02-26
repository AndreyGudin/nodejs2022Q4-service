import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
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
    throw new BadRequestException();
  }

  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.login(createUserDto);
    console.log('result', result);
    if (typeof result === 'object') return result;
    throw new ForbiddenException({
      message: result,
      statusCode: HttpStatus.FORBIDDEN,
    });
  }

  @Post('/refresh')
  refresh(@Body() { refreshToken }: RefreshTokenDto) {
    if (refreshToken) {
      const result = this.authService.refresh(refreshToken);
      if ('accessToken' in result) return result;
      throw new ForbiddenException({
        message: 'Refresh token is invalid or expired',
        statusCode: HttpStatus.FORBIDDEN,
      });
    }
    throw new UnauthorizedException();
  }
}
