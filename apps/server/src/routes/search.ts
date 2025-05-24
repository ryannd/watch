import type { SearchResponse } from "@repo/types";
import TmdbService from "@service/tmdb-service.js";
import type { TmdbSearchResponse } from "types/tmdb.js";
import { Hono } from "hono";

const app = new Hono()
const tmdbService = new TmdbService()

app.get('/', async (c) => {
    const { query, page, type } = c.req.query();

    if (!query) {
        return c.text('Query parameter is required', 400);
    }

    const tmdbResponse = await tmdbService.getSearch(type, query, page);
    const parsedResponse = await tmdbResponse.json() as TmdbSearchResponse;
    const serializedData: SearchResponse = {
        page: parsedResponse.page,
        results: parsedResponse.results.map((result) => {
        return {
            backgroundImage: result.backdrop_path,
            mediaType: result.media_type,
            posterImage: result.poster_path,
            releaseDate: result.release_date,
            title: result.title
        }
    }),
        totalPages: parsedResponse.total_pages,
        totalResults: parsedResponse.total_results
    }

    return new Response(JSON.stringify(serializedData), tmdbResponse)
})

export default app