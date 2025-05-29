import { relations } from 'drizzle-orm';
import { integer, varchar, pgTable } from 'drizzle-orm/pg-core';
import { entry } from './entry-schema';

export const media = pgTable('media', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    poster: varchar({ length: 255 }),
    description: varchar({ length: 255 }),
    releaseDate: varchar({ length: 255 }),
    source: varchar({ length: 255 }).notNull(),
});

export const mediaRelations = relations(media, ({ many }) => ({
    seasons: many(season),
    entries: many(entry),
}));

export const season = pgTable('season', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    seasonNumber: integer().notNull(),
    episodeCount: integer().notNull(),
    description: varchar({ length: 255 }).notNull(),
    airDate: varchar({ length: 255 }),
    mediaId: integer(),
});

export const seasonRelations = relations(season, ({ one }) => ({
    media: one(media, {
        fields: [season.mediaId],
        references: [media.id],
    }),
}));
