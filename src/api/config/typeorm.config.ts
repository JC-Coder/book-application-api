import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PGHOST || 'localhost',
  username: process.env.PGUSER || 'postgres',
  port: +process.env.PGPORT || 5432,
  password: process.env.PGPASSWORD || 'root',
  database: process.env.PGDATABASE || 'book_app_api',
  autoLoadEntities: true,
  synchronize: true,
  dropSchema: false,
};
