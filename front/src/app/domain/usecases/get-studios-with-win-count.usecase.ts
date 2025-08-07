import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StudioWinCount } from "../entities/studio-win-count";
import { MoviesRepository } from "../repositories/movies.repository";

@Injectable({ providedIn: 'root' })
export class GetStudiosWithWinCount {
    constructor(private readonly repository: MoviesRepository) {}

    execute(): Observable<StudioWinCount[]> {
        return this.repository.getStudiosWithWinCount();
    }
}
