import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api.service';
import {
  Observable,
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { Movie } from '../../movie';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-searching-movies',
  templateUrl: './searching-movies.component.html',
  styleUrl: './searching-movies.component.scss',
})
export class SearchingMoviesComponent implements OnInit, OnDestroy {
  protected movies$: Observable<Movie[]> = of([]);
  private searchTerms = new Subject<string>();
  private subscription?: Subscription;

  constructor(
    private moviesApi: MoviesApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movies$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.moviesApi.fetchMoviesByKeyword(term)),

      startWith([])
    );

    this.subscription = this.activatedRoute.queryParamMap
      .pipe(map((q: ParamMap) => q.get('q')))
      .subscribe((q) => {
        if (q) {
          this.search(q);
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
