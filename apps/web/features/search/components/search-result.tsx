import { SearchResult as SearchResultType } from '@repo/types';
import { Card, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/card';
import {Badge} from '@repo/ui/components/badge'

interface SearchResultProps {
    result: SearchResultType;
}

export default function SearchResult({ result }: SearchResultProps) {
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
            {result.mediaType && <Badge variant="outline">{result.mediaType.toLocaleUpperCase()}</Badge>}
          </CardHeader>
        </div>
      </div>
        </Card>
    );
}
