import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest, startWith, switchMap, debounceTime } from 'rxjs';
import { Movie } from 'src/app/domain/entities/movie';
import { MovieSearchParams } from 'src/app/domain/entities/movie-search-params';
import { PagedResult } from 'src/app/domain/entities/paged-result';
import { MoviesFacade } from '../../facades/movies.facade';
import { HeaderService } from "src/app/core/services/header.service";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ]
})
export class MoviesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  movies$!: Observable<PagedResult<Movie>>;
  displayedColumns: string[] = ['id', 'year', 'title', 'winner'];
  title = 'Movie List';

  yearFilter = new FormControl();
  winnerFilter = new FormControl(null);

  private pageIndex = new BehaviorSubject<number>(0);
  private pageSize = new BehaviorSubject<number>(10);

  constructor(private readonly facade: MoviesFacade, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.setPageTitle(this.title);

    this.movies$ = combineLatest([
      this.pageIndex.asObservable(),
      this.pageSize.asObservable(),
      this.yearFilter.valueChanges.pipe(startWith(null), debounceTime(300)),
      this.winnerFilter.valueChanges.pipe(startWith(null))
    ]).pipe(
      switchMap(([page, size, year, winner]) => {
        const params: MovieSearchParams = {
          page: page,
          size: size,
          year: year,
          winner: winner === true ? true : (winner === false ? false : undefined)
        };
        return this.facade.getMovies(params);
      })
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.next(event.pageIndex);
    this.pageSize.next(event.pageSize);
  }

  resetFilters(): void {
    this.yearFilter.setValue(null);
    this.winnerFilter.setValue(null);
    this.pageIndex.next(0);
    this.pageSize.next(10);
  }
}
