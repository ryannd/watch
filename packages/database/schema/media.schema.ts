import { relations } from 'drizzle-orm';
import { integer, pgTable } from 'drizzle-orm/pg-core';
import { entry } from './entry.schema';
import { text } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';

export const mediaTypeEnum = pgEnum('mediaType', ['tv', 'movie', 'unknown']);

export const media = pgTable('media', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    poster: text(),
    description: text(),
    releaseDate: text(),
    source: text().notNull().unique(),
    mediaType: mediaTypeEnum().default('unknown'),
});

export const mediaRelations = relations(media, ({ many }) => ({
    seasons: many(season),
    entries: many(entry),
}));

export const season = pgTable('season', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    seasonNumber: integer().notNull(),
    episodeCount: integer().notNull(),
    description: text().notNull(),
    airDate: text(),
    mediaId: integer(),
});

export const seasonRelations = relations(season, ({ one }) => ({
    media: one(media, {
        fields: [season.mediaId],
        references: [media.id],
    }),
}));
