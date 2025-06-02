import TmdbService from "@service/tmdb.service.js"
import type { TmdbMovieResponse, TmdbShowResponse } from "types/tmdb.js"
import { Hono } from "hono"

const app = new Hono()
const tmdbService = new TmdbService()

app.get('/tv', async (c) => {
    const { id } = c.req.query();

    if (!id) {
        return c.text('Query parameter is required', 400);
    }

    const tmdbResponse = await tmdbService.getTv(id);
    const parsedResponse = await tmdbResponse.json() as TmdbShowResponse;
    const serializedData = {
        description: parsedResponse.overview,
        source: `tmdb-tv-${id}`,
        name: parsedResponse.name,
        poster: parsedResponse.poster_path,
        releaseDate: parsedResponse.first_air_date
    };

    return new Response(JSON.stringify(serializedData), tmdbResponse);
})

app.get('/movie', async (c) => {
    const { id } = c.req.query();

    if (!id) {
        return c.text('Query parameter is required', 400);
    }

    const tmdbResponse = await tmdbService.getMovie(id);
    const parsedResponse = await tmdbResponse.json() as TmdbMovieResponse;
    const serializedData = {
        description: parsedResponse.overview,
        source: `tmdb-movie-${id}`,
        name: parsedResponse.title,
        poster: parsedResponse.poster_path,
        releaseDate: parsedResponse.release_date
    }

    return new Response(JSON.stringify(serializedData), tmdbResponse);
})

export default app;