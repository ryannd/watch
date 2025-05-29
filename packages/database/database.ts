import { drizzle } from 'drizzle-orm/postgres-js';
import dotenv from 'dotenv';
import * as schema from './schema/index';

dotenv.config();

export const db = drizzle({
    connection: {
        url: process.env.DATABASE_URL,
        user: process.env.DATABASE_USER,
        pass: process.env.DATABASE_PASSWORD,
    },
    schema,
    casing: 'snake_case',
});
