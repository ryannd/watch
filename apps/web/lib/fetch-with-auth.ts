import { authClient } from '@/features/auth/lib/auth-client';

const fetchWithAuth = async <Data>(
    apiPath: string,
    body?: object,
): Promise<Data> => {
    const res: { data: Data | null; error?: boolean } = await authClient.$fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${apiPath}`,
        body,
    );

    if (res.error) {
        throw new Error('An error occurred while fetching the data.');
    }

    if (res.data === null || res.data === undefined) {
        throw new Error('Received null or undefined data from the API.');
    }

    return res.data;
};

export default fetchWithAuth;
