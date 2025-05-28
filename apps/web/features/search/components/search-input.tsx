import { SearchType } from '@/features/search/types';
import { Input } from '@repo/ui/components/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@repo/ui/components/select';
import { ChangeEvent } from 'react';

interface SearchInputProps {
    onQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
    query: string;
    onTypeChange: (type: SearchType) => void;
}

export default function SearchInput({
    onQueryChange,
    query,
    onTypeChange,
}: SearchInputProps) {
    return (
        <div className="flex w-full gap-8">
            <Select onValueChange={onTypeChange} defaultValue="multi">
                <SelectTrigger>
                    <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="multi">Multi</SelectItem>
                    <SelectItem value="tv">TV</SelectItem>
                    <SelectItem value="movie">Movie</SelectItem>
                </SelectContent>
            </Select>
            <Input value={query} onChange={onQueryChange} />
        </div>
    );
}
