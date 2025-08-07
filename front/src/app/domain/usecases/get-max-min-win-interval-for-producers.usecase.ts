import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProducerIntervals } from "../entities/producer-intervals";
import { MoviesRepository } from "../repositories/movies.repository";

@Injectable({ providedIn: 'root' })
export class GetMaxMinWinIntervalForProducers {
    constructor(private readonly repository: MoviesRepository) {}

    execute(): Observable<ProducerIntervals> {
        return this.repository.getMaxMinWinIntervalForProducers();
    }
}
