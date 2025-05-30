export interface TmdbSearchResponse {
    page: number;
    results: TmdbSearchResult[];
    total_pages: number;
    total_results: number;
}

export interface TmdbSearchResult {
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

export interface TmdbShowResponse {
    backdrop_path: string | null;
    first_air_date: string;
    genres: {
        id: number;
        name: string;
    }[];
    id: number;
    languages: string[];
    last_air_date: string | null;
    name: string;
    next_episode_to_air: string | null;
    number_of_episodes: number;
    number_of_seasons: number;
    original_name: string;
    overview: string | null;
    poster_path: string | null;
    seasons: TmdbSeason[];
    tagline: string | null;
};

export interface TmdbSeason {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
}

export interface TmdbMovieResponse {
    backdrop_path: string | null;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    runtime: number | null;
    tagline: string | null;
    title: string;
};