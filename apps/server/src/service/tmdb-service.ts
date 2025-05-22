import { proxy } from "hono/proxy";

export default class TmdbService {
    private apiBaseUrl = "https://api.themoviedb.org/3";
    private headers = { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
    constructor() {}

    getSearch(
        type = 'multi',
        searchTerm: string,
        page: string = '1'
    ) {
        const requestUrl = new URL(`${this.apiBaseUrl}/search/${type}`);
        requestUrl.searchParams.append("query", searchTerm);
        requestUrl.searchParams.append("include_adult", 'false');
        requestUrl.searchParams.append("page", page.toString());

        return proxy(requestUrl, { headers: this.headers })
    }
}