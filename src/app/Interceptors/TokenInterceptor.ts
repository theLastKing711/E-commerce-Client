import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const userToken = this.authService.getToken();

    const requestWithToken = httpRequest.clone({
      headers: httpRequest.headers.set('Authorization', `Bearer ${userToken}`)
    })

    return next.handle(requestWithToken);
  }
}
