import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQLHOST || 'localhost',
  username: process.env.MYSQLUSER || 'root',
  // port: +process.env.MYSQLPORT,
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQLDATABASE || 'book_app_api',
  autoLoadEntities: true,
  synchronize: true,
  dropSchema: false,
};
