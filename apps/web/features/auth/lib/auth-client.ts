import { createAuthClient } from 'better-auth/react';

export const authClient: ReturnType<typeof createAuthClient> = createAuthClient(
    {
        baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
        fetch: ((input, init) => {
            return fetch(input, {
                ...init,
                credentials: 'include', // Required for sending cookies cross-origin
            });
        }) satisfies typeof fetch,
    },
);
