import {
  Component,
  ElementRef,
  Input,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.setDefaultInputValue();

    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(300),
        map(() => this.searchInput.nativeElement.value),
        distinctUntilChanged(),
        tap((query: string) => {
          this.searchInput.nativeElement.blur();
          this.router.navigate([], { queryParams: { query } });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setDefaultInputValue() {
    const query: string =
      this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

    if (query) {
      this.renderer.setProperty(this.searchInput.nativeElement, 'value', query);
    }
  }
}
