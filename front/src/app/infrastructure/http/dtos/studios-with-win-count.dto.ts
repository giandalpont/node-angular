export interface StudiosWithWinCountDto {
    studios: StudioWinCountDto[];
}

export interface StudioWinCountDto {
    name: string;
    winCount: number;
}
