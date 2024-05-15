import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api.service';
import { Movie } from '../../movie';

@Component({
  selector: 'app-trending-movies',
  templateUrl: './trending-movies.component.html',
  styleUrl: './trending-movies.component.scss',
})
export class TrendingMoviesComponent implements OnInit {
  public trendingMovies: Movie[] = [];

  constructor(private moviesApi: MoviesApiService) {}

  ngOnInit(): void {
    this.moviesApi.fetchTrendingMovies().subscribe((movies) => {
      this.trendingMovies = movies;
    });
  }
}
