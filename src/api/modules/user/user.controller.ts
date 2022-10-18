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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // register request
  @Post('register')
  @ApiCreatedResponse({ description: 'Registered Succesfully', type: User })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request. Try again!!' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async register(@Body() user: CreateUserDto): Promise<User|Object> {
    return await this.userService.registerUser(user);
  }

  // login request
  @Post('login')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async login(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(user, response);
  }

  // logout request
  @Post('logout')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async logout(
    @Res({ passthrough: true }) response: Response,
  ): Promise<User | Object> {
    return await this.authService.logout(response);
  }

  // get user profile 
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBearerAuth('access-token')
  @Get('profile')
  async getUser(@Request() req) {
    return await this.userService.userProfile(req.user.email);
  }

  //User update Profile
  @UseGuards(JwtAuthGuard, UserGuard)
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @Put(':id')
  async updateUser(@Param('id') id, @Body() user) {
    return await this.userService.updateUser(id, user);
  }
}
