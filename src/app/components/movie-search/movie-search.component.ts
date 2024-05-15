import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.scss',
})
export class MovieSearchComponent {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  setQuery(query: string) {
    const q = query.trim();

    const queryParams = q
      ? { q }
      : {
          q: null,
        };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
