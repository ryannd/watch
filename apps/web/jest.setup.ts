import '@testing-library/jest-dom';

jest.mock('better-auth/react', () => ({
    createAuthClient: jest.fn(() => ({
        signIn: {
            email: jest.fn().mockImplementation((credentials, callbacks) => {
                // You can customize this mock based on your test cases
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

jest.mock('lucide-react');
