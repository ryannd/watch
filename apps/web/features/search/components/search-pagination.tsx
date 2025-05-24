import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationNext,
    PaginationEllipsis,
} from '@repo/ui/components/pagination';

interface SearchPaginationProps {
    totalPages: number;
    page: number;
    changePage: (newPage: number) => void;
    siblingCount?: number;
}

export default function SearchPagination({
    totalPages,
    page,
    changePage,
    siblingCount = 2,
}: SearchPaginationProps) {
    const range = (start: number, end: number) => {
        const length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
    };

    const generatePagination = () => {
        const totalPageNumbers = siblingCount + 5;

        if (totalPages <= totalPageNumbers) {
            return range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(page - siblingCount, 1);
        const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

        const shouldShowLeftEllipsis = leftSiblingIndex > 2;
        const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = range(1, leftItemCount);
            return [...leftRange, 'ellipsis', totalPages];
        }

        if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = range(
                totalPages - rightItemCount + 1,
                totalPages,
            );
            return [firstPageIndex, 'ellipsis', ...rightRange];
        }

        if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [
                firstPageIndex,
                'ellipsis',
                ...middleRange,
                'ellipsis',
                lastPageIndex,
            ];
        }

        return [];
    };

    const paginationItems = generatePagination();

    if (totalPages > 1) {
        return (
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    {paginationItems.map((item, index) => {
                        if (item === 'ellipsis') {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }

                        return (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    isActive={item === page}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        changePage(item as number);
                                    }}
                                >
                                    {item}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );
    }
}
