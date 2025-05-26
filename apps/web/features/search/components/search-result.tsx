import { SearchResult as SearchResultType } from '@repo/types';
import { Card, CardHeader, CardTitle } from '@repo/ui/components/card';

interface SearchResultProps {
    result: SearchResultType;
}

export default function SearchResult({ result }: SearchResultProps) {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>{result.title}</CardTitle>
            </CardHeader>
        </Card>
    );
}
