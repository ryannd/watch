import { EntryDto, SearchResult as SearchResultType } from '@repo/types';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@repo/ui/components/card';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Plus } from 'lucide-react';
import fetchWithAuth from '@/lib/fetch-with-auth';
import { useContext } from 'react';
import { AuthContext } from '@/features/auth/context/AuthContext';

interface SearchResultProps {
    result: SearchResultType;
    inList: boolean;
}

export default function SearchResult({ result, inList }: SearchResultProps) {
    const { isAuthenticated } = useContext(AuthContext)
    const onAdd = async () => {
        const dto: EntryDto = {
            id: result.id.toString(),
            source: 'tmdb',
            status: 'planning',
            type: result.mediaType,
        };

        await fetchWithAuth(`/entry/create`, {
            method: 'POST',
            body: JSON.stringify(dto),
        });
    };

    return (
        <Card className="overflow-hidden p-0 mb-3">
            <div className="flex">
                <div className="h-full">
                    <img
                        src={result.posterImage}
                        alt={`${result.title} poster`}
                        className="w-[150px] h-[150px] object-cover"
                    />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <CardHeader>
                        <CardTitle>{result.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                            {result.description}
                        </CardDescription>
                        {result.mediaType && (
                            <Badge variant="outline">
                                {result.mediaType.toLocaleUpperCase()}
                            </Badge>
                        )}
                    </CardHeader>
                </div>
                {isAuthenticated && <CardFooter>
                    {inList ? (
                        <></>
                    ) : (
                        <Button onClick={onAdd}>
                            <Plus />
                        </Button>
                    )}
                </CardFooter>}
            </div>
        </Card>
    );
}
