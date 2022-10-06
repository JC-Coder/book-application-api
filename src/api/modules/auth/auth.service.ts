import { BadRequestException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from '../user/dto/loginDto';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}
    
    // validate user credentials 
    async validateCredentials(email, password){
        let user = await this.userService.findByMail(email);

        if(!user) throw new BadRequestException('invalid credentials');

        if(user){
            let passwordMatch = await bcrypt.compare(password, user.password);

            if(!passwordMatch) throw new BadRequestException('credentials do not match');

            return user;
        }
    }

    // user login 
    async login(loginPayload: UserLoginDto){
       let result = await this.validateCredentials(loginPayload.email, loginPayload.password)


       let jwt = this.jwtService.sign({
        sub: result.id,
        email: result.email,
        role: result.role
       })

       return  {
        access_token: jwt, message: "Login Successful"
       }
    }
    
}