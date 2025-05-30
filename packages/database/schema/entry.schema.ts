import { relations } from 'drizzle-orm';
import { pgEnum } from 'drizzle-orm/pg-core';
import { pgTable, integer } from 'drizzle-orm/pg-core';
import { media } from './media.schema';

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
});

export const entryRelations = relations(entry, ({ one }) => ({
    media: one(media, {
        fields: [entry.mediaId],
        references: [media.id],
    }),
}));
