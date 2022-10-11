import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from './dto/loginDto';
import { CreateUserDto } from './dto/userDto';
import { User } from './entity/entities';
import { UserService } from './user.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/Guards/authGuard';
import { UserGuard } from '../auth/Guards/userGuard';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';

  @ApiTags('User')
  @Controller('user')
  export class UserController {
    constructor(
      private readonly userService: UserService,
      private readonly authService: AuthService,
    ) {}

    // register request
    @Post('register')
    @ApiCreatedResponse({
      description: 'Created User ',
      type: User,
    })
    @ApiBadRequestResponse({ description: 'Registration Failed, Try Again!!!' })
    async register(@Body() user: CreateUserDto): Promise<User> {
      return await this.userService.registerUser(user);
    }

    // login request
    @Post('login')
    @ApiCreatedResponse({
      description: 'Login Sucessful',
    })
    @ApiBadRequestResponse({
      description: 'Credentials Incorrect, Try Again!!!',
    })
    async login(
      @Body() user: LoginDto,
      @Res({ passthrough: true }) response: Response,
    ) {
      return await this.authService.login(user, response);
    }

    // logout request
    @Post('logout')
    @ApiCreatedResponse({
      description: 'LogOut Sucessful',
    })
    async logout(
      @Res({ passthrough: true }) response: Response,
    ): Promise<User | Object> {
      return await this.authService.logout(response);
    }

    // Authorization of users
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({
      description: 'User Authorized',
    })
    @ApiBadRequestResponse({
      description: 'User UnAuthorized, Confirm token is invalid',
    })
    @Get('profile')
    async getUser(@Request() req) {
      return await req.user;
    }

    //User update
    @UseGuards(JwtAuthGuard, UserGuard)
    @ApiCreatedResponse({
      description: 'User is Updated',
    })
    @ApiBadRequestResponse({
      description: 'Only User can update Profile, login as a user',
    })
    @Put(':id')
    async updateUser(@Param('id') id, @Body() user) {
      return await this.userService.updateUser(id, user);
    }
   
  }
