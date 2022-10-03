import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { typeOrmConfig } from './api/config/typeorm.config';
import { UserModule } from './api/modules/user/user.module';
import { BookModule } from './api/modules/book/book.module';
import { ContactModule } from './api/modules/contact/contact.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MulterModule.register({
      dest: './uploads/images',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..', 'uploads'),
    }),
    UserModule,
    BookModule,
    ContactModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
