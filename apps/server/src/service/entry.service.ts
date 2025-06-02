import type { EntryDto } from "@dto/entry.dto.js";
import { authLib } from "@lib/auth.js";
import { db, entry, type NewEntry } from "@repo/database";
import type MediaService from "@service/media.service.js";
import { auth } from "hono/utils/basic-auth";

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
            userId: user.id
        }
        
        return await db.insert(entry).values(newEntry);
    }
}