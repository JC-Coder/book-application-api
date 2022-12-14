import { Module,  } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from './entity/entities';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),  AuthModule],
  providers: [UserService ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
