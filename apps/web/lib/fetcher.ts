const fetcher = async <Data>(apiPath: string): Promise<Data> => {
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${apiPath}`,
    );
    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.');
        throw error;
    }
    return res.json();
};

export default fetcher;
