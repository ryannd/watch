export interface TmdbSearchResponse {
    page: number;
    results: TmdbResult[];
    total_pages: number;
    total_results: number;
}

export interface TmdbResult {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    name: string;
    first_air_date: string;
}