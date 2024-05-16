import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.scss',
})
export class MovieSearchComponent {
  @ViewChild('search')
  private searchInput!: ElementRef<HTMLInputElement>;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(300),
        map(() => this.searchInput.nativeElement.value),
        distinctUntilChanged(),
        tap((query: string) =>
          this.router.navigate([], { queryParams: { query } })
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
