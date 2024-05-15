import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Pipe({
  name: 'movieListPath',
})
export class MovieListPathPipe implements PipeTransform {
  transform(id: number, route: ActivatedRoute): string {
    const isMovies = route.snapshot.routeConfig?.path === 'movies';
    return isMovies ? `${id}` : `movies/${id}`;
  }
}
