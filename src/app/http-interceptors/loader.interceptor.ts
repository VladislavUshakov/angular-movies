import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable, tap } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const url = req.url.split('?')[0].split('/').join('_');
    this.loader.show();

    return next.handle(req).pipe(
      tap((res) => {
        if (res.type) {
          this.loader.hide();
        }
      })
    );
  }
}
