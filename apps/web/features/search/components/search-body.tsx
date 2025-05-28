import SearchResult from '@/features/search/components/search-result';
import { SearchResult as SearchResultType } from '@repo/types';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { Skeleton } from '@repo/ui/components/skeleton';

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
    return (
        <ScrollArea className="w-full min-h-3/4 h-3/4 rounded-md border p-5 gap-2">
            {isLoading || !results || error
                ? Array.from({ length: 8 }).map((_, idx) => (
                      <Skeleton data-testid="skeleton" key={idx} />
                  ))
                : results.map((result) => {
                      return <SearchResult result={result} key={result.id} />;
                  })}
        </ScrollArea>
    );
}
