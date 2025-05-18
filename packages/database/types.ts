import { InferSelectModel } from 'drizzle-orm';
import { user } from './schema/index';

export type User = InferSelectModel<typeof user>;
