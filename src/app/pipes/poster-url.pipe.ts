import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posterUrl',
})
export class PosterUrlPipe implements PipeTransform {
  private baseUrl = 'https://image.tmdb.org/t/p/w185/';
  transform(url: string): string {
    return this.baseUrl + url;
  }
}
