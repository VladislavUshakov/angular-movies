import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  private apiKey: string =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjEzMWI3YjFlZTUwNTIzMTBmYWVlNDEwNzkxMDViOCIsInN1YiI6IjY0MjM1NDY4ZmNiOGNjMDA5NzY0N2MzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gXqVVAU3K9JjJFWpsxp8RtOAJsWG1ULtaJTKglxqZos';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      })
    );
  }
}
