import { render } from '@testing-library/react';
import SearchResult from './search-result';
import { SearchResult as SearchResultType } from '@repo/types';

describe('SearchResult', () => {
    it('renders the title from the result prop', () => {
        const mockResult: SearchResultType = {
            title: 'Test Title',
        } as SearchResultType;
        const { getByText } = render(<SearchResult result={mockResult} />);
        expect(getByText('Test Title')).toBeInTheDocument();
    });
});
