import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/entities';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
    
    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({where:{email:email}})
    }
 
    async createUser(user): Promise<User> {
        try {
            const newUser = await this.userRepository.save(user)
            return newUser
        } catch {
            throw new UnauthorizedException()
        }
    }
  
}
