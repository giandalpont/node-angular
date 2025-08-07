import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Year } from "../../domain/entities/year";
import { ProducerIntervals } from "../../domain/entities/producer-intervals";
import { StudioWinCount } from "../../domain/entities/studio-win-count";
import { Movie } from "../../domain/entities/movie";
import { MovieSearchParams } from "../../domain/entities/movie-search-params";
import { PagedResult } from "../../domain/entities/paged-result";
import { GetYearsWithMultipleWinners } from "../../domain/usecases/get-years-with-multiple-winners.usecase";
import { GetMaxMinWinIntervalForProducers } from "../../domain/usecases/get-max-min-win-interval-for-producers.usecase";
import { GetStudiosWithWinCount } from "../../domain/usecases/get-studios-with-win-count.usecase";
import { GetWinnersByYear } from "../../domain/usecases/get-winners-by-year.usecase";
import { GetMovies } from "../../domain/usecases/get-movies.usecase";

@Injectable({ providedIn: 'root' })
export class MoviesFacade {
    constructor(
        private readonly getYearsWithMultipleWinnersUseCase: GetYearsWithMultipleWinners,
        private readonly getMaxMinWinIntervalForProducersUseCase: GetMaxMinWinIntervalForProducers,
        private readonly getStudiosWithWinCountUseCase: GetStudiosWithWinCount,
        private readonly getWinnersByYearUseCase: GetWinnersByYear,
        private readonly getMoviesUseCase: GetMovies
    ) {}

    getYearsWithMultipleWinners(): Observable<Year[]> {
        return this.getYearsWithMultipleWinnersUseCase.execute();
    }

    getMaxMinWinIntervalForProducers(): Observable<ProducerIntervals> {
        return this.getMaxMinWinIntervalForProducersUseCase.execute();
    }

    getStudiosWithWinCount(): Observable<StudioWinCount[]> {
        return this.getStudiosWithWinCountUseCase.execute();
    }

    getWinnersByYear(year: number): Observable<Movie[]> {
        return this.getWinnersByYearUseCase.execute(year);
    }

    getMovies(params: MovieSearchParams): Observable<PagedResult<Movie>> {
        return this.getMoviesUseCase.execute(params);
    }
}
