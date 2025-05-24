import { SearchResult as SearchResultType } from '@repo/types';
import { Card, CardHeader } from '@repo/ui/components/card';

interface SearchResultProps {
    result: SearchResultType;
}

export default function SearchResult({ result }: SearchResultProps) {
    return (
        <Card className="rounded-none">
            <CardHeader>{result.title}</CardHeader>
        </Card>
    );
}
