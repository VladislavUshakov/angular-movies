import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public readonly loader$ = this._loader.asObservable();

  public show(): void {
    this._loader.next(true);
  }

  public hide(): void {
    this._loader.next(false);
  }
}
