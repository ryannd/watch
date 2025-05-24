export type SearchResponse = {
    page: number,
    results: SearchResult[];
    totalPages: number;
    totalResults: number;
}

export type SearchResult = {
    backgroundImage: string;
    posterImage: string;
    title: string;
    mediaType: string;
    releaseDate: string;
}