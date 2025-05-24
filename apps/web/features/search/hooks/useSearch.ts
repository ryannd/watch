import { SearchType } from '@/features/search/types';
import fetcher from '@/lib/fetcher';
import { SearchResponse } from '@repo/types';
import { ChangeEvent, useEffect, useState } from 'react';
import useSWR from 'swr';

export default function useSearch() {
    const [page, setPage] = useState(1);
    const [type, setType] = useState('multi');
    const [queryDebounced, setQueryDebounced] = useState('');
    const [query, setQuery] = useState('');

     const changePage = (newPage: number) => {
            setPage(newPage);
    };

    const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const onTypeChange = (type: SearchType) => {
        setType(type);
    };

    const { data, error, isLoading } = useSWR<SearchResponse>(
        `/search?query=${queryDebounced}&type=${type}&page=${page}`,
        fetcher,
        { keepPreviousData: true },
    );

    useEffect(() => {
            const handler = setTimeout(() => {
                setQueryDebounced(query);
            }, 500);
    
            return () => {
                clearTimeout(handler);
            };
        }, [query]);
    

    return {
        data,
        error,
        isLoading,
        changePage,
        currentPage: page,
        onTypeChange,
        onQueryChange,
        query
    };
}
