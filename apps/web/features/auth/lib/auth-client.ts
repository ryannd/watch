import { createAuthClient } from 'better-auth/react';

export const authClient: ReturnType<typeof createAuthClient> = createAuthClient(
    {
        baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    },
);
