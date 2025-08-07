import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../entities/movie";
import { MoviesRepository } from "../repositories/movies.repository";

@Injectable({ providedIn: 'root' })
export class GetWinnersByYear {
    constructor(private readonly repository: MoviesRepository) {}

    execute(year: number): Observable<Movie[]> {
        return this.repository.getWinnersByYear(year);
    }
}
