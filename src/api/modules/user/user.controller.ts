import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserLoginDto } from './dto/loginDto';
import { CreateUserDto } from './dto/userDto';
import { User } from './entity/entities';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private authService: AuthService){}

    // create user 
    @Post('create')
    async create(@Body() userPayload: CreateUserDto): Promise<User> {
        return this.userService.createUser(userPayload)
    }

    // user login 
    @Post('login')
    async login(@Body() loginPayload: UserLoginDto){
        return this.authService.login(loginPayload);
    }

    // user profile
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getUserProfile(@Request() req){
        return await req.user
    }
}