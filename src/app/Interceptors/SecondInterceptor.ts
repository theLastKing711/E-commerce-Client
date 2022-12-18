import { LoadingService } from './../loading.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpSentEvent } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class SecondInterceptor implements HttpInterceptor {


  constructor(private loadingService: LoadingService) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(httpRequest).pipe(
        tap(() => console.log("second interceptor")),
        tap( (event: HttpEvent<any>) => console.log("event", event)),
        // tap((event: HttpEvent<any>) => {
        //     if(event.type == 0)
        //     {
        //         this.loadingService.showLoading()
        //     }
        // })
    );
  }
}
