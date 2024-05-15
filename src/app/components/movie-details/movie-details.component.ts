import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MoviesApiService } from '../../services/movies-api.service';
import { MovieDetails } from '../../movie';
import { Location } from '@angular/common';
import { Observable, filter, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  protected movie$: Observable<MovieDetails | null> = of(null);

  constructor(
    private route: ActivatedRoute,
    private moviesApi: MoviesApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.movie$ = this.route.paramMap.pipe(
      map((paramMap: ParamMap) => paramMap.get('id')),
      filter(Boolean),
      switchMap((id: string) => this.moviesApi.fetchMovieDetails(+id))
    );
  }

  goBack() {
    this.location.back();
  }
}
