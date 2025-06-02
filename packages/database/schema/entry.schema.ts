import { relations } from 'drizzle-orm';
import { pgEnum } from 'drizzle-orm/pg-core';
import { pgTable, integer } from 'drizzle-orm/pg-core';
import { media } from './media.schema';
import { user } from './auth.schema';
import { text } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', [
    'planning',
    'watching',
    'completed',
]);

export const entry = pgTable('entry', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    status: statusEnum().default('planning'),
    seasonProgress: integer(),
    episodeProgress: integer(),
    mediaId: integer(),
    userId: text(),
});

export const entryRelations = relations(entry, ({ one }) => ({
    media: one(media, {
        fields: [entry.mediaId],
        references: [media.id],
    }),
    user: one(user, {
        fields: [entry.userId],
        references: [user.id],
    }),
}));
