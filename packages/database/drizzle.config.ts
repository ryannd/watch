import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    schema: './schema/index.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        host: process.env.DATABASE_HOST || '',
        port: 5432,
        user: process.env.DATABASE_USER || '',
        password: process.env.DATABASE_PASSWORD || '',
        database: process.env.DATABASE_NAME || '',
        ssl: false,
    },
    casing: 'snake_case',
});
