import { CommonModule } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, switchMap } from 'rxjs';
import { Year } from 'src/app/domain/entities/year';
import { ProducerIntervals } from 'src/app/domain/entities/producer-intervals';
import { StudioWinCount } from 'src/app/domain/entities/studio-win-count';
import { Movie } from 'src/app/domain/entities/movie';
import { MoviesFacade } from '../../facades/movies.facade';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class DashboardComponent implements OnInit {
  years$!: Observable<Year[]>;
  producersIntervals$!: Observable<ProducerIntervals>;
  studiosWithWinCount$!: Observable<StudioWinCount[]>;
  winnersByYear$!: Observable<Movie[]>;

  yearControl = new FormControl();
  searchWinners$ = new Subject<number>();

  displayedColumnsYears = ['year', 'winnerCount'];
  displayedColumnsProducers = ['producer', 'interval', 'previousWin', 'followingWin'];
  displayedColumnsStudios = ['name', 'winCount'];
  displayedColumnsWinners = ['id', 'year', 'title'];

  constructor(private readonly facade: MoviesFacade, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.setPageTitle('Dashboard');
    this.years$ = this.facade.getYearsWithMultipleWinners();
    this.producersIntervals$ = this.facade.getMaxMinWinIntervalForProducers();
    this.studiosWithWinCount$ = this.facade.getStudiosWithWinCount();

    this.winnersByYear$ = this.searchWinners$.pipe(
      switchMap(year => this.facade.getWinnersByYear(year))
    );
  }

  searchWinnersByYear(): void {
    if (this.yearControl.value) {
      this.searchWinners$.next(this.yearControl.value);
    }
  }
}
