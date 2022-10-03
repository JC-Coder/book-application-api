import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LoginDto } from '../user/dto/loginDto';
import { UserDto } from '../user/dto/userDto';
import { User } from '../user/entity/entities';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: UserDto): Promise<User | Object> {
    const createdUser = await this.authService.register(user);
    return createdUser;
  }
  @Post('login')
  async login(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const loginUser = await this.authService.login(user, response);
    return loginUser;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    return await this.authService.logout(response);
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  async getAuthoriezedUser(@Request() req) {
      return await req.user
  }
}
