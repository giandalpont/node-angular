export interface YearsWithMultipleWinnersResponse {
    years: YearDto[];
}

export interface YearDto {
    year: number;
    winnerCount: number;
}
