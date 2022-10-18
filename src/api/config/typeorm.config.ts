import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL || ' postgres://postgres:root@localhost:5432/book_app_api';,
  autoLoadEntities: true,
  synchronize: true,
  dropSchema: true,
};
