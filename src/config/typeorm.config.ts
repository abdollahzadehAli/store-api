import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'process';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNC === 'true',
  autoLoadEntities: true,
  entities: [__dirname + '../../**/entities/*.entity.{ts,js}'],
  logging: process.env.DATABASE_LOG === 'true',
  dropSchema: false,
  extra: {
    max: 40,
    connectionTimeoutMillis: 70000,
  },
};
