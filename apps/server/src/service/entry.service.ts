import type { EntryDto } from "@dto/entry.dto.js";
import { authLib } from "@lib/auth.js";
import { db, entry, sql, type NewEntry } from "@repo/database";
import type MediaService from "@service/media.service.js";

export default class EntryService {
    private mediaService: MediaService;

    constructor (mediaService: MediaService) {
        this.mediaService = mediaService;
    }

    public async create(dto: EntryDto, user: typeof authLib.$Infer.Session.user) {
        const media = await this.mediaService.create(dto.id, dto.type);
        const newEntry: NewEntry = {
            mediaId: media?.id,
            status: dto.status,
            userId: user.id,
            episodeProgress: dto.type === 'tv' ? 0 : null,
            seasonProgress: dto.type === 'tv' ? 1 : null
        }
        
        const [inserted] = await db.insert(entry).values(newEntry).returning();
        return inserted;
    }

    public async findBySource(sources: string, user: typeof authLib.$Infer.Session.user) {
        const sourceArr = sources.split(',').map(s => s.trim());

        const mediaRows = await db.query.media.findMany({
            where: (media, { inArray }) => inArray(media.source, sourceArr),
            columns: { id: true, source: true }
        });

        const mediaIdToSource = Object.fromEntries(mediaRows.map(m => [m.id, m.source]));

        const entryRows = await db.query.entry.findMany({
            where: (entry, { inArray, eq }) =>
                eq(entry.userId, user.id) && inArray(entry.mediaId, mediaRows.map(m => m.id)),
            columns: { mediaId: true }
        });

        const result: Record<string, boolean> = {};
        for (const source of sourceArr) {
            result[source] = false;
        }
        for (const entry of entryRows) {
            if (entry.mediaId !== null) {
                const source = mediaIdToSource[entry.mediaId];
                if (source) result[source] = true;
            }
        }
        return result;
    }
}