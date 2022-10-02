import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { typeOrmConfig } from './api/config/typeorm.config';
import { UserModule } from './api/modules/user/user.module';
import { BookModule } from './api/modules/book/book.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..', 'uploads'),
    }),
    UserModule,
    BookModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
