import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genres',
})
export class GenresPipe implements PipeTransform {
  transform(genres: string[], quantity: number = 3): string {
    const currentGenres = genres.slice(0, quantity);
    return currentGenres.join(' ');
  }
}
