import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Year } from "../entities/year";
import { MoviesRepository } from "../repositories/movies.repository";

@Injectable({ providedIn: 'root' })
export class GetYearsWithMultipleWinners {
    constructor(private readonly repository: MoviesRepository) {}

    execute(): Observable<Year[]> {
        return this.repository.getYearsWithMultipleWinners();
    }
}
