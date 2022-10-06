import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/entities';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/userDto';


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
 
    // register new user
    async createUser(user: CreateUserDto): Promise<User> {
        let newPassword = await bcrypt.hash(user.password, 12);

            let emailExist = await this.findByMail(user.email);

            if(emailExist) throw new BadRequestException("user with this email already exists ");


            const newUser = await this.userRepository.create(user)
            newUser.password  = newPassword;

            let result =  await this.userRepository.save(newUser);
            delete result.password;
            return result;
  
    }



    // find user by email 
    async findByMail(email: string){
        return this.userRepository.findOne({
            where: {email: email}
        })
    }
}
