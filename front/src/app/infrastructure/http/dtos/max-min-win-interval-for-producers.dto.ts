export interface MaxMinWinIntervalForProducersDto {
    min: ProducerIntervalDto[];
    max: ProducerIntervalDto[];
}

export interface ProducerIntervalDto {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}
