'use client';

import useSearch from '@/features/search/hooks/useSearch';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
} from '@repo/ui/components/pagination';
import { useState } from 'react';

export default function Search() {
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useSearch('movie', 'pokemon', page);

    const changePage = (newPage: number) => {
        setPage(newPage);
    };

    if (isLoading) {
        return <h1>LOADING</h1>;
    }

    if (error) {
        return <h1>Error</h1>;
    }

    if (data) {
        return (
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    {Array.from(
                        { length: data.totalPages || 0 },
                        (_, index) => {
                            return (
                                <PaginationItem>
                                    <PaginationLink
                                        onClick={() => changePage(index + 1)}
                                        href="#"
                                        isActive={index === data.page - 1}
                                        key={index}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        },
                    )}

                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );
    }
}
