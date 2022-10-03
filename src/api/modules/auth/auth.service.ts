import { BadRequestException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entity/entities';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) { }
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async register(user): Promise<User | Object> {
        const sameEmail = await this.userService.getUserByEmail(user.email);
        if (!sameEmail) {
            const { password } = user;
            const hash = await this.hashPassword(password);
            const createdUser = await this.userService.createUser({
                ...user,
                password: hash,
            });

            return {
                message: `${createdUser.username}😊😊, you have sucessfully registered`,
            };
        } else {
            throw new BadRequestException();
        }
    }

    async validateUser(user) {
        const sameEmail = await this.userService.getUserByEmail(user.email);
        if (!sameEmail) {
            throw new UnauthorizedException('Credentials Incorrect');
        }
        if (!(await bcrypt.compare(user.password, sameEmail.password))) {
            throw new UnauthorizedException('Credentials Incorrect');
        }
    }

    async login(user, @Res({ passthrough: true }) response: Response) {
        await this.validateUser(user);
        const jwt = await this.jwtService.sign({
            sub: user.sub,
            email: user.email,
            password: user.password,
        });
        response.cookie('jwt', jwt, { httpOnly: true });
        return {
            message: `${user.email} Sucessfully logged in`,
        };
    }

    async logout(@Res({ passthrough: true }) response: Response): Promise<User|Object> {
       await response.clearCookie('jwt')
        return {message:`sucesssfully logged out👋👋`}
    }
    
    
}


