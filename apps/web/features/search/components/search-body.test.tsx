import SearchBody from '@/features/search/components/search-body';
import { SearchResult } from '@repo/types';
import { render, screen } from '@testing-library/react';

const mockResults: SearchResult[] = [
    {
        backgroundImage: 'testbg',
        id: 1234,
        mediaType: 'tv',
        posterImage: 'testposter',
        releaseDate: 'testrelease',
        title: 'testtitle1',
        description: 'testdesc',
    },
    {
        backgroundImage: 'testbg',
        id: 1232,
        mediaType: 'tv',
        posterImage: 'testposter',
        releaseDate: 'testrelease',
        title: 'testtitle1',
        description: 'testdesc',
    },
    {
        backgroundImage: 'testbg',
        id: 1235,
        mediaType: 'tv',
        posterImage: 'testposter',
        releaseDate: 'testrelease',
        title: 'testtitle1',
        description: 'testdesc',
    },
    {
        backgroundImage: 'testbg',
        id: 1231,
        mediaType: 'tv',
        posterImage: 'testposter',
        releaseDate: 'testrelease',
        title: 'testtitle1',
        description: 'testdesc',
    },
];

describe('SearchBody', () => {
    it('renders loaded state', async () => {
        render(
            <SearchBody results={mockResults} error={null} isLoading={false} />,
        );
        expect(await screen.findAllByText('testtitle1')).toHaveLength(
            mockResults.length,
        );
        expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    });

    it('renders loading/error state', async () => {
        render(
            <SearchBody results={undefined} error={null} isLoading={true} />,
        );
        expect(screen.queryByText('testtitle1')).not.toBeInTheDocument();
        expect(await screen.findAllByTestId('skeleton')).toHaveLength(8);
    });
});
