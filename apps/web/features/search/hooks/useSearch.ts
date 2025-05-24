import fetcher from '@/lib/fetcher';
import { SearchResponse } from '@repo/types';
import useSWR from 'swr';

export default function useSearch(
    type: string,
    query: string,
    page: number = 1,
) {
    const { data, error, isLoading } = useSWR<SearchResponse>(
        `/search?query=${query}&type=${type}&page=${page}`,
        fetcher,
    );

    return {
        data,
        error,
        isLoading,
    };
}
