import SearchInput from '@/features/search/components/search-input';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

describe('SearchInput', () => {
    const mockOnQueryChange = jest.fn();
    const mockOnTypeChange = jest.fn();
    const defaultProps = {
        onQueryChange: mockOnQueryChange,
        query: '',
        onTypeChange: mockOnTypeChange,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders', () => {
        render(<SearchInput {...defaultProps} />);

        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();
        expect(select).toHaveTextContent('Multi');

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('');
    });

    it('calls onQueryChange when input value changes', () => {
        render(<SearchInput {...defaultProps} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'change input' } });

        expect(mockOnQueryChange).toHaveBeenCalledTimes(1);
    });

    it('calls onTypeChange when select value changes', async () => {
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
        render(<SearchInput {...defaultProps} />);

        const select = screen.getByRole('combobox');
        fireEvent.click(select);

        const option = await waitFor(() => screen.getByText('TV'));
        await userEvent.click(option);
        expect(mockOnTypeChange).toHaveBeenCalledTimes(1);
        expect(mockOnTypeChange).toHaveBeenCalledWith('tv');
    });

    it('updates the input value when query prop changes', () => {
        const { rerender } = render(<SearchInput {...defaultProps} />);

        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('');

        rerender(<SearchInput {...defaultProps} query="new query" />);
        expect(input).toHaveValue('new query');
    });
});
