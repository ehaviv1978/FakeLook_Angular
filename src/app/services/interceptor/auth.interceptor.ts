import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem("authToken");
    if (authToken){
      console.log("test");
      const cloned = request.clone({
        headers: request.headers.set("authToken",authToken)
      });
      return next.handle(cloned);
    }
    else
      return next.handle(request);
  }
}
