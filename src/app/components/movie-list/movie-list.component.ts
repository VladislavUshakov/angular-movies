import { Component, Input } from '@angular/core';
import { Movie } from '../../movie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  @Input() movies: Movie[] = [];

  constructor(public route: ActivatedRoute) {}
}
