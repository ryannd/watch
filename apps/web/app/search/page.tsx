'use client';

import SearchBody from '@/features/search/components/search-body';
import SearchInput from '@/features/search/components/search-input';
import SearchPagination from '@/features/search/components/search-pagination';
import useSearch from '@/features/search/hooks/useSearch';

export default function Page() {
    const {
        data,
        error,
        isLoading,
        changePage,
        currentPage,
        onTypeChange,
        onQueryChange,
        query,
    } = useSearch();
    return (
        <div className="h-screen mx-8 lg:mx-32 flex justify-center items-center flex-col gap-12">
            <SearchInput
                onQueryChange={onQueryChange}
                query={query}
                onTypeChange={onTypeChange}
            />
            <SearchBody
                results={data?.results}
                error={error}
                isLoading={isLoading}
            />
            <SearchPagination
                changePage={changePage}
                page={currentPage}
                totalPages={data?.totalPages || 0}
            />
        </div>
    );
}
