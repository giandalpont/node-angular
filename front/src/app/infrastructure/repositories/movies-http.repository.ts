import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Year } from "src/app/domain/entities/year";
import { ProducerIntervals } from "src/app/domain/entities/producer-intervals";
import { StudioWinCount } from "src/app/domain/entities/studio-win-count";
import { Movie } from "src/app/domain/entities/movie";
import { MovieSearchParams } from "src/app/domain/entities/movie-search-params";
import { PagedResult } from "src/app/domain/entities/paged-result";
import { MoviesRepository } from "src/app/domain/repositories/movies.repository";
import { environment } from "src/environments/environment";
import { YearsWithMultipleWinnersResponse } from "../http/dtos/years-with-multiple-winners.dto";
import { MaxMinWinIntervalForProducersDto } from "../http/dtos/max-min-win-interval-for-producers.dto";
import { StudiosWithWinCountDto } from "../http/dtos/studios-with-win-count.dto";
import { MovieDto } from "../http/dtos/movie.dto";

@Injectable({ providedIn: 'root' })
export class MoviesHttpRepository extends MoviesRepository {
    constructor(private readonly http: HttpClient) {
        super();
    }

    getYearsWithMultipleWinners(): Observable<Year[]> {
        return this.http.get<YearsWithMultipleWinnersResponse>(`${environment.API_BASE_URL}/movies/yearsWithMultipleWinners`)
            .pipe(
                map(response => response.years)
            );
    }

    getMaxMinWinIntervalForProducers(): Observable<ProducerIntervals> {
        return this.http.get<MaxMinWinIntervalForProducersDto>(`${environment.API_BASE_URL}/movies/maxMinWinIntervalForProducers`)
            .pipe(
                map(response => response as ProducerIntervals)
            );
    }

    getStudiosWithWinCount(): Observable<StudioWinCount[]> {
        return this.http.get<StudiosWithWinCountDto>(`${environment.API_BASE_URL}/movies/studiosWithWinCount`)
            .pipe(
                map(response => response.studios)
            );
    }

    getWinnersByYear(year: number): Observable<Movie[]> {
        return this.http.get<MovieDto[]>(`${environment.API_BASE_URL}/movies/winnersByYear?year=${year}`)
            .pipe(
                map(response => response as Movie[])
            );
    }

    getMovies(params: MovieSearchParams): Observable<PagedResult<Movie>> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('page', params.page.toString());
        httpParams = httpParams.append('size', params.size.toString());
        if (params.year) {
            httpParams = httpParams.append('year', params.year.toString());
        }
        if (params.winner !== undefined) {
            httpParams = httpParams.append('winner', params.winner.toString());
        }

        return this.http.get<PagedResult<MovieDto>>(`${environment.API_BASE_URL}/movies`, { params: httpParams })
            .pipe(
                map(response => response as PagedResult<Movie>)
            );
    }
}
