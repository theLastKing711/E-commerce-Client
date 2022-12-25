import { ErrorInterceptor } from './Interceptors/ErrorInterceptor';
import { SecondInterceptor } from './Interceptors/SecondInterceptor';
import { TokenInterceptor } from './Interceptors/TokenInterceptor';
import { AuthGuard } from './auth/auth.guard';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
  ],
  providers: [AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SecondInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
