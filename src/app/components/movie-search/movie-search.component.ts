import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
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

  // Why doesn't work

  // @Input() set query(value: string) {
  //   if (value) {
  //     console.log('ins', value);
  //   }
  // }

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    //
    const query: string =
      this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

    if (query) {
      this.renderer.setProperty(this.searchInput.nativeElement, 'value', query);
    }
    //

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
