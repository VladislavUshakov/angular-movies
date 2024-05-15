import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api.service';
import {
  Observable,
  map,
  of,
  switchMap,
} from 'rxjs';
import { Movie } from '../../movie';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-searching-movies',
  templateUrl: './searching-movies.component.html',
  styleUrl: './searching-movies.component.scss',
})
export class SearchingMoviesComponent implements OnInit {
  protected movies$: Observable<Movie[]> = of([]);

  constructor(
    private moviesApi: MoviesApiService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.movies$ = this.activatedRoute.queryParamMap.pipe(
      map((paramMap: ParamMap) => paramMap.get('query')),
      switchMap((keyword: string | null) => {
        return keyword ? this.moviesApi.fetchMoviesByKeyword(keyword) : [];
      }),
    );
  }
}
