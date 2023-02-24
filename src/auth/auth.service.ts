import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userService: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(createUserDto: CreateUserDto) {
    const user = await this.userService.findOne({
      where: { login: createUserDto.login },
    });
    if (user) return;
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      +process.env.CRYPT_SALT,
    );
    const createdUser = this.userService.create({
      login: createUserDto.login,
      password: hashPassword,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    });
    return await this.userService.save(createdUser);
  }

  async login(createUserDto: CreateUserDto) {
    const user = await this.userService.findOne({
      where: { login: createUserDto.login },
    });
    const isPasswordEqual = await bcrypt.compare(
      createUserDto.password,
      user.password,
    );
    const payload = { userId: user.id, login: user.login };
    if (isPasswordEqual && user) {
      return {
        token: this.jwtService.sign(payload),
        refreshToken: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        }),
      };
    }
    return;
  }
}
