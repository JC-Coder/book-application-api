import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQLHOST || 'adaptable-prod.database.windows.net',
  username: process.env.MYSQLUSER || 'bookstore-main-db-060f6f16c7f4a981f',
  port: +process.env.MYSQLPORT || 1433,
  password: process.env.MYSQLPASSWORD || 'EavUB3UUQUEB8AY2SdKNY5Jts4RbK2',
  database: process.env.MYSQLDATABASE || 'bookstore-main-db-060f6f16c7f4a981f',
  autoLoadEntities: true,
  synchronize: true,
  dropSchema: false,
};
