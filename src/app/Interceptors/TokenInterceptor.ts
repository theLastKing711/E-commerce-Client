import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const userToken = this.authService.getUser();

    const requestWithToken = httpRequest.clone({
      headers: httpRequest.headers.set('Authorization', `Bearer ${userToken}`)
    })

    return next.handle(requestWithToken).pipe(
      tap(() => console.log("first interceptor")),
      tap( (event: HttpEvent<any>) => console.log("event token", event))
    )
  }
}
