import { Component, Input, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api.service';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { Movie } from '../../movie';

@Component({
  selector: 'app-searching-movies',
  templateUrl: './searching-movies.component.html',
  styleUrl: './searching-movies.component.scss',
})
export class SearchingMoviesComponent implements OnInit {
  protected movies$: Observable<Movie[]> = of([]);
  private searchTerms = new BehaviorSubject<string>('');

  @Input() set query(value: string) {
    if (value) {
      this.searchTerms.next(value);
    }
  }

  constructor(private moviesApi: MoviesApiService) {}

  ngOnInit(): void {
    this.movies$ = this.searchTerms.pipe(
      switchMap((term: string) =>
        term ? this.moviesApi.fetchMoviesByKeyword(term) : of([])
      )
    );
  }
}
