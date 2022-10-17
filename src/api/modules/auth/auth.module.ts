import { Module, forwardRef } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/entities';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constant';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './stragtegy/jwtstrategy';



@Module({
  imports: [
    forwardRef(()=>UserModule),
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),

  ],
  controllers: [],
  providers: [AuthService, JwtStrategy, UserService],
  exports:[AuthService]

})
export class AuthModule {}
