import { db, media, type NewMedia } from "@repo/database";
import type TmdbService from "@service/tmdb.service.js";
import type { TmdbMovieResponse } from "types/tmdb.js";

export default class MediaService {
    private tmdbService: TmdbService;

    constructor(tmdbService: TmdbService) {
        this.tmdbService = tmdbService;
    }

    public async create(id: string, type: string) {
        switch(type) {
            case 'movie':
                { const movieResponse = await this.tmdbService.getMovie(id);
                const found = await this.find(`tmdb-movie-${id}`);
                
                if(found) {
                    return found;
                } else {
                    const parsedResponse = await movieResponse.json() as TmdbMovieResponse;
                    const newMovie: NewMedia = {
                        name: parsedResponse.title,
                        source: `tmdb-movie-${id}`,
                        description: parsedResponse.overview,
                        poster: parsedResponse.poster_path,
                        releaseDate: parsedResponse.release_date
                    }
                    await db.insert(media).values(newMovie);
                } }
        }
    }

    public async find(source: string) {
        const found = await db.query.media.findFirst({
            where: (_, { sql }) => sql`source = ${source}`
        });
        
        return found;
    }
}