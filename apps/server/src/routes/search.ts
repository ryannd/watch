import TmdbService from "@service/tmdb-service.js";
import { Hono } from "hono";

const app = new Hono()
const tmdbService = new TmdbService()

app.get('/', async (c) => {
    const { query, page } = c.req.query();

    if (!query) {
        return c.text('Query parameter is required', 400);
    }

    return tmdbService.getSearch('multi', query, page);
})

export default app