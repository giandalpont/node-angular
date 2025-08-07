import { Observable } from "rxjs";
import { Year } from "../entities/year";
import { ProducerIntervals } from "../entities/producer-intervals";
import { StudioWinCount } from "../entities/studio-win-count";
import { Movie } from "../entities/movie";
import { MovieSearchParams } from "../entities/movie-search-params";
import { PagedResult } from "../entities/paged-result";

export abstract class MoviesRepository {
    abstract getYearsWithMultipleWinners(): Observable<Year[]>;
    abstract getMaxMinWinIntervalForProducers(): Observable<ProducerIntervals>;
    abstract getStudiosWithWinCount(): Observable<StudioWinCount[]>;
    abstract getWinnersByYear(year: number): Observable<Movie[]>;
    abstract getMovies(params: MovieSearchParams): Observable<PagedResult<Movie>>;
}
