import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api.service';
import { Movie } from '../../movie';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-trending-movies',
  templateUrl: './trending-movies.component.html',
  styleUrl: './trending-movies.component.scss',
})
export class TrendingMoviesComponent implements OnInit {
  public movies$?: Observable<Movie[]> = of([]);

  constructor(private moviesApi: MoviesApiService) {}

  ngOnInit(): void {
    this.movies$ = this.moviesApi.fetchTrendingMovies();
  }
}
