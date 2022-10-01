import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { typeOrmConfig } from './api/config/typeorm.config';
import { UserController } from './api/modules/user/user.controller';
import { UserModule } from './api/modules/user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..', 'uploads'),
    }),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
