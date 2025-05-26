import { render, screen, fireEvent } from '@testing-library/react';
import SearchPagination from './search-pagination';

describe('SearchPagination', () => {
    const changePageMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders pagination with correct number of pages', () => {
        render(
            <SearchPagination
                totalPages={5}
                page={1}
                changePage={changePageMock}
            />,
        );

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('calls changePage when a page number is clicked', () => {
        render(
            <SearchPagination
                totalPages={5}
                page={1}
                changePage={changePageMock}
            />,
        );

        fireEvent.click(screen.getByText('3'));
        expect(changePageMock).toHaveBeenCalledWith(3);
    });

    it('renders correctly with siblingCount prop', () => {
        render(
            <SearchPagination
                totalPages={20}
                page={10}
                changePage={changePageMock}
                siblingCount={1}
            />,
        );

        expect(screen.getByText('9')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('11')).toBeInTheDocument();
    });
});
