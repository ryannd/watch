import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { user, media, season, entry, statusEnum } from './schema/index';

export type User = InferSelectModel<typeof user>;

export type Media = InferSelectModel<typeof media>;
export type NewMedia = InferInsertModel<typeof media>;

export type Season = InferSelectModel<typeof season>;
export type NewSeason = InferInsertModel<typeof season>;

export type Entry = InferSelectModel<typeof entry>;
export type NewEntry = InferInsertModel<typeof entry>;

export type StatusType = typeof statusEnum;
