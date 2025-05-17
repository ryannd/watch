import { text, serial, pgTable, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    fullName: text(),
    phone: varchar('phone', { length: 256 }),
});
