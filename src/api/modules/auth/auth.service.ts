import {
  Injectable,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entity/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

    
    // Validating a User before login
  async validateUser(user) {
    const userEmail = await this.userService.getUserByEmail(user.email);
    if (!userEmail) {
      throw new UnauthorizedException('Credentials Incorrect');
    }
    if (!(await bcrypt.compare(user.password, userEmail.password))) {
      throw new UnauthorizedException('Credentials Incorrect');
    }
    return userEmail;
  }


    // login in a user
  async login(user, @Res({ passthrough: true }) response: Response) {
    const result = await this.validateUser(user);

    const jwt = await this.jwtService.sign({
      sub: result.id,
      email: result.email,
      role: result.role,
    });
    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      access_token: jwt,
      message: `${user.email} Sucessfully logged in`,
    };
    }
    

    // logout a user
  async logout(@Res({ passthrough: true }) response: Response): Promise<User|Object> {
     await response.clearCookie('jwt')
      return {message:`sucesssfully logged out👋👋`}
  }
}
