import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.scss',
})
export class MovieSearchComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public searchControl = new FormControl(this.getValueFromUrlParams('query'));

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((query) => {
          this.router.navigate([], { queryParams: { query } });
        }),
        map(() => null),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getValueFromUrlParams(key: string): string {
    return this.activatedRoute.snapshot.queryParamMap.get(key) ?? '';
  }
}
