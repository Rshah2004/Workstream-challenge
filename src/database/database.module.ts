import { Module } from '@nestjs/common';
import { Pool } from 'pg';

// console.log('Database name in database.module.ts:', process.env.DATABASE_NAME);   

// This module provides a database connection pool that can be injected and used throughout the application. 
// It utilizes PostgreSQL as the database, with connection parameters sourced from environment variables.

@Module({
  providers: [
    {
      provide: 'DATABASE_POOL',
      useValue: new Pool({
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
      }),
    },
  ],
  exports: ['DATABASE_POOL'],
})
export class DatabaseModule {}
