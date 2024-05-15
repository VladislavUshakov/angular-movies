import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, map, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.scss',
})
export class MovieSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('search', { static: true }) private searchInput!: ElementRef<HTMLInputElement>;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input').pipe(
      debounceTime(300),
      map(() => this.searchInput.nativeElement.value),
      distinctUntilChanged(),
      tap((query: string) => this.router.navigate([], { queryParams: { query } })),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  ngAfterViewInit(): void {
    this.searchInput.nativeElement.value = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
