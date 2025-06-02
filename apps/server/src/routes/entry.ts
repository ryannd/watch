import type { EntryDto } from "@dto/entry.dto.js";
import type { authLib } from "@lib/auth.js";
import EntryService from "@service/entry.service.js";
import MediaService from "@service/media.service.js";
import TmdbService from "@service/tmdb.service.js";
import { Hono } from "hono";

const app = new Hono<{
    Variables: {
        user: typeof authLib.$Infer.Session.user | null;
        session: typeof authLib.$Infer.Session.session | null
    }
}>()

const tmdbService = new TmdbService();
const mediaService = new MediaService(tmdbService);
const entryService = new EntryService(mediaService);

app.post('/create', async (c) => {
    const body = JSON.parse(await c.req.json()) as EntryDto;
    const user = c.get("user")
	
    if (!user) {
        return c.text("Unauthorized", 401);
    }

    const result = await entryService.create(body, user);
    return c.json(result);
})

export default app;