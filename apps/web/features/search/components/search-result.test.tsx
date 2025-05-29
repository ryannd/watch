import { render } from '@testing-library/react';
import SearchResult from './search-result';
import { SearchResult as SearchResultType } from '@repo/types';

describe('SearchResult', () => {
    it('renders the title from the result prop', () => {
        const mockResult: SearchResultType = {
            title: 'Test Title',
            mediaType: 'tv',
        } as SearchResultType;
        const { getByText } = render(<SearchResult result={mockResult} />);
        expect(getByText('Test Title')).toBeInTheDocument();
    });

    it('renders the description from the result prop', () => {
        const mockResult: SearchResultType = {
            title: 'Test Title',
            description: 'Test Description',
            mediaType: 'movie',
        } as SearchResultType;
        const { getByText } = render(<SearchResult result={mockResult} />);
        expect(getByText('Test Description')).toBeInTheDocument();
    });

    it('renders the poster image with correct src and alt', () => {
        const mockResult: SearchResultType = {
            title: 'Test Title',
            posterImage: 'http://example.com/poster.jpg',
            mediaType: 'movie',
        } as SearchResultType;
        const { getByAltText } = render(<SearchResult result={mockResult} />);
        const img = getByAltText('Test Title poster') as HTMLImageElement;
        expect(img).toBeInTheDocument();
        expect(img.src).toBe('http://example.com/poster.jpg');
    });

    it('renders the mediaType badge in uppercase', () => {
        const mockResult: SearchResultType = {
            title: 'Test Title',
            mediaType: 'anime',
        } as SearchResultType;
        const { getByText } = render(<SearchResult result={mockResult} />);
        expect(getByText('ANIME')).toBeInTheDocument();
    });

    it('does not render the badge if mediaType is missing', () => {
        const mockResult: SearchResultType = {
            title: 'Test Title',
        } as SearchResultType;
        const { queryByText } = render(<SearchResult result={mockResult} />);
        expect(queryByText('TV')).not.toBeInTheDocument();
        expect(queryByText('MOVIE')).not.toBeInTheDocument();
        expect(queryByText('ANIME')).not.toBeInTheDocument();
    });
});
