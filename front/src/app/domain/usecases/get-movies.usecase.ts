import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../entities/movie";
import { MovieSearchParams } from "../entities/movie-search-params";
import { PagedResult } from "../entities/paged-result";
import { MoviesRepository } from "../repositories/movies.repository";

@Injectable({ providedIn: 'root' })
export class GetMovies {
    constructor(private readonly repository: MoviesRepository) {}

    execute(params: MovieSearchParams): Observable<PagedResult<Movie>> {
        return this.repository.getMovies(params);
    }
}
