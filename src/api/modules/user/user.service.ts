import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/entities';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/userDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Getting user by their email from server
  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  // Getting user by their id from server
  async getUserById(id) {
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  // hash a password
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  // User registration
  async registerUser(user: CreateUserDto): Promise<User | Object> {
    const userEmail = await this.getUserByEmail(user.email);
    if (user.password !== user.confirmPassword) {
      return { message: `Passwords does not match, Confirm Password` };
    }
    if (!userEmail) {
      const newUser = await this.userRepository.create(user);
      newUser.password = await this.hashPassword(user.password);
      const result = await this.userRepository.save(newUser);
      delete result.password;
      delete result.confirmPassword
      return result;
    } else {
      throw new BadRequestException(`User already Exists`);
    }
  }

  // User Update Profile
  async updateUser(id, user: User) {
    const getUser = await this.getUserById(user.id);
    if (!getUser) {
      throw new UnauthorizedException(`User not found`);
    }
    const newUser = await this.userRepository.create(user);
    newUser.password = await this.hashPassword(user.password);
    await this.userRepository.update(id, newUser);
    return {
      message: `User sucessfully Updated`,
    };
  }


  // get user profile 
  async userProfile(email){
    let user = await this.getUserByEmail(email);
    delete user.password;
    delete user.confirmPassword;

    return user;
  }
}
