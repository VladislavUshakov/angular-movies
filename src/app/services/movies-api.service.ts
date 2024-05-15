import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Genre, Movie, MovieDetails } from '../movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private apiKey: string =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjEzMWI3YjFlZTUwNTIzMTBmYWVlNDEwNzkxMDViOCIsInN1YiI6IjY0MjM1NDY4ZmNiOGNjMDA5NzY0N2MzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gXqVVAU3K9JjJFWpsxp8RtOAJsWG1ULtaJTKglxqZos';
  private url: string = 'https://api.themoviedb.org/3';

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
    }),
  };

  constructor(private http: HttpClient) {}

  fetchTrendingMovies(): Observable<Movie[]> {
    return this.http
      .get<any>(`${this.url}/trending/movie/day`, this.httpOptions)
      .pipe(
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
    return this.http.get<any>(`${this.url}/movie/${id}`, this.httpOptions).pipe(
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
    return this.http
      .get<any>(
        `${this.url}/search/movie?page=1&query=${keyword}`,
        this.httpOptions
      )
      .pipe(
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
