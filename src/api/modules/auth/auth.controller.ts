import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LoginDto } from '../user/dto/loginDto';
import { CreateUserDto } from '../user/dto/userDto';
import { User } from '../user/entity/entities';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor() {}





}
