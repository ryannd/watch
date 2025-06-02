import { authClient } from '@/features/auth/lib/auth-client';
import SignInForm from '@/features/auth/components/sign-in-form';
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => {
    return {
        useRouter: jest.fn(),
    };
});

const mockSignInEmail = authClient.signIn.email as jest.Mock;
const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.Mock;

describe('SignInForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseRouter.mockReturnValue({
            push: mockPush,
        });
    });
    it('renders form with all fields', () => {
        render(<SignInForm />);
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Submit' }),
        ).toBeInTheDocument();
    });

    it('submits the form with valid data', async () => {
        render(<SignInForm />);

        fireEvent.input(screen.getByLabelText('Email'), {
            target: { value: 'user@example.com' },
        });

        fireEvent.input(screen.getByLabelText('Password'), {
            target: { value: 'password123' },
        });

        mockSignInEmail.mockImplementation((_, { onSuccess }) => {
            onSuccess();
        });

        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        await waitFor(() => {
            expect(screen.getByRole('button')).toHaveTextContent('Loading');
        });

        expect(mockSignInEmail).toHaveBeenCalledWith(
            {
                email: 'user@example.com',
                password: 'password123',
            },
            expect.objectContaining({
                onSuccess: expect.any(Function),
                onError: expect.any(Function),
            }),
        );

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/');
        });
    });

    it('handles sign in error', async () => {
        render(<SignInForm />);

        fireEvent.input(screen.getByLabelText('Email'), {
            target: { value: 'user@example.com' },
        });
        fireEvent.input(screen.getByLabelText('Password'), {
            target: { value: 'password123' },
        });

        const errorMessage = 'Invalid credentials';
        mockSignInEmail.mockImplementation((_, { onError }) => {
            onError({ error: { message: errorMessage } });
        });

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
        });

        await waitFor(() => {
            expect(screen.getByRole('button')).toHaveTextContent('Submit');
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
});
