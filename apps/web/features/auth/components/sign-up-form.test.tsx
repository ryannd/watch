import { authClient } from '@/features/auth/lib/auth-client';
import SignUpForm from '@/features/auth/components/sign-up-form';
import {
    render,
    screen,
    fireEvent,
    waitFor,
    act,
} from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('better-auth/react', () => ({
    createAuthClient: jest.fn(() => ({
        signUp: {
            email: jest.fn().mockImplementation((credentials, callbacks) => {
                if (credentials.email === 'success@example.com') {
                    callbacks.onSuccess();
                } else {
                    callbacks.onError({
                        error: {
                            message: 'Email already in use',
                        },
                    });
                }
            }),
        },
    })),
}));

jest.mock('next/navigation', () => {
    return {
        useRouter: jest.fn(),
    };
});

const mockSignUpEmail = authClient.signUp.email as jest.Mock;
const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.Mock;

describe('SignUpForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseRouter.mockReturnValue({
            push: mockPush,
        });
    });

    it('renders the form with all fields', () => {
        render(<SignUpForm />);

        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Submit' }),
        ).toBeInTheDocument();
    });

    it('submits the form with valid data', async () => {
        render(<SignUpForm />);

        fireEvent.input(screen.getByLabelText('Name'), {
            target: { value: 'John Doe' },
        });
        fireEvent.input(screen.getByLabelText('Email'), {
            target: { value: 'john@example.com' },
        });
        fireEvent.input(screen.getByLabelText('Password'), {
            target: { value: 'password123' },
        });

        mockSignUpEmail.mockImplementation((_, { onSuccess }) => {
            onSuccess();
        });

        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        await waitFor(() => {
            expect(screen.getByRole('button')).toHaveTextContent('Loading');
        });

        expect(mockSignUpEmail).toHaveBeenCalledWith(
            {
                name: 'John Doe',
                email: 'john@example.com',
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

    it('handles signup error', async () => {
        render(<SignUpForm />);

        fireEvent.input(screen.getByLabelText('Name'), {
            target: { value: 'John Doe' },
        });
        fireEvent.input(screen.getByLabelText('Email'), {
            target: { value: 'john@example.com' },
        });
        fireEvent.input(screen.getByLabelText('Password'), {
            target: { value: 'password123' },
        });

        const errorMessage = 'Email already in use';
        mockSignUpEmail.mockImplementation((_, { onError }) => {
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
