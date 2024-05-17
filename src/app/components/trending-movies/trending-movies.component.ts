import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api.service';
import { Movie } from '../../movie';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trending-movies',
  templateUrl: './trending-movies.component.html',
  styleUrl: './trending-movies.component.scss',
})
export class TrendingMoviesComponent {
  public movies$: Observable<Movie[]> = this.moviesApi.fetchTrendingMovies();

  constructor(private moviesApi: MoviesApiService) {}
}
