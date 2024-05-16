import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Genre, Movie, MovieDetails } from '../movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  constructor(private http: HttpClient) {}

  fetchTrendingMovies(): Observable<Movie[]> {
    return this.http.get<any>('/trending/movie/day').pipe(
      map(({ results }) => {
        return results.map((movie: Movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        }));
      }),
      catchError(this.handleError<Movie[]>('fetchTrendingMovies', []))
    );
  }

  fetchMovieDetails(id: number): Observable<MovieDetails | null> {
    return this.http.get<any>(`/movie/${id}`).pipe(
      map((movie) => {
        const {
          id,
          title,
          poster_path,
          overview,
          vote_average,
          genres: genresData,
        } = movie;
        const genres = genresData.map((g: Genre) => g.name);
        return { id, title, poster_path, overview, vote_average, genres };
      }),
      catchError(
        this.handleError<MovieDetails | null>('fetchMovieDetails', null)
      )
    );
  }

  fetchMoviesByKeyword(keyword: string) {
    return this.http.get<any>(`/search/movie?page=1&query=${keyword}`).pipe(
      map((res) => res.results),
      map((res) =>
        res.map((movie: Movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        }))
      ),
      catchError(this.handleError<MovieDetails>('fetchMoviesByKeyword'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error({ operation, error });
      return of(result as T);
    };
  }
}
