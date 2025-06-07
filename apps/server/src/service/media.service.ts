import { db, media, season, type Media, type NewMedia, type NewSeason } from "@repo/database";
import type TmdbService from "@service/tmdb.service.js";
import type { TmdbMovieResponse, TmdbShowResponse } from "types/tmdb.js";

export default class MediaService {
    private tmdbService: TmdbService;

    constructor(tmdbService: TmdbService) {
        this.tmdbService = tmdbService;
    }

    public async create(id: string, type: string): Promise<Media | undefined> {
        switch(type) {
            case 'movie':
                return await this.createMovie(id);
            case 'tv':
                return await this.createShow(id);  
        }
    }

    public async createMovie(id: string) {
        const movieResponse = await this.tmdbService.getMovie(id);
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
             const [inserted] = await db.insert(media).values(newMovie).returning();
             return inserted;
        }
    }

    public async createShow(id: string) {
        const showResponse = await this.tmdbService.getTv(id);
        const found = await this.find(`tmdb-tv-${id}`);

        if(found) {
            return found;
        } else {
            const parsedResponse = await showResponse.json() as TmdbShowResponse;

            const result = await db.transaction(async (tx) => {
                const newShow: NewMedia = {
                    name: parsedResponse.name,
                    source: `tmdb-tv-${id}`,
                    description: parsedResponse.overview,
                    poster: parsedResponse.poster_path,
                    releaseDate: parsedResponse.first_air_date
                }

                const [show] = await tx.insert(media).values(newShow).returning();

                const seasons = parsedResponse.seasons.map((season) => {
                    return {
                        description: season.overview,
                        episodeCount: season.episode_count,
                        seasonNumber: season.season_number,
                        airDate: season.air_date,
                        mediaId: show!.id
                    } as NewSeason
                })

                await tx.insert(season).values(seasons);

                const mediaWithSeasons = await tx.query.media.findFirst({
                    where: (_, { sql }) => sql`id = ${show?.id}`,
                    with: {
                        seasons: true,
                    },
                });

                return mediaWithSeasons;
            })

            return result;
        }
    }

    public async find(source: string) {
        const found = await db.query.media.findFirst({
            where: (_, { sql }) => sql`source = ${source}`
        });
        
        return found;
    }
}