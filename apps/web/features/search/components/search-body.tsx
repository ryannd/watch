import SearchResult from '@/features/search/components/search-result';
import fetchWithAuth from '@/lib/fetch-with-auth';
import { SearchResult as SearchResultType } from '@repo/types';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { Skeleton } from '@repo/ui/components/skeleton';
import useSWR from 'swr';

interface SearchBodyProps {
    results: SearchResultType[] | undefined;
    error: any;
    isLoading: boolean;
}

export default function SearchBody({
    results,
    isLoading,
    error,
}: SearchBodyProps) {
    const sources =
        results?.map((r) => `tmdb-${r.mediaType}-${r.id}`).join(',') ?? '';
    const { data: existsMap } = useSWR<Record<string, boolean>>(
        `/entry/exists?source=${sources}`,
        fetchWithAuth,
    );

    return (
        <ScrollArea className="w-full min-h-3/4 h-3/4 rounded-md border p-5 gap-2">
            {isLoading || !results || error
                ? Array.from({ length: 8 }).map((_, idx) => (
                      <Skeleton data-testid="skeleton" key={idx} />
                  ))
                : results.map((result) => {
                      const source = `tmdb-${result.mediaType}-${result.id}`;
                      return (
                          <SearchResult
                              result={result}
                              key={result.id}
                              inList={!!existsMap?.[source]}
                          />
                      );
                  })}
        </ScrollArea>
    );
}
