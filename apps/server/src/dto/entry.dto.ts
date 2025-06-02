export interface EntryDto {
    id: string;
    type: string;
    source: string;
    status: "planning" | "watching" | "completed"
}