import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { ILogin } from './../../../types/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertifyService } from 'src/app/services/alertify.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginSubscription!: Subscription;

  constructor(
    private alertifyService: AlertifyService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    ) { }

  ngOnInit(): void {

  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  login() {

    const loginFormValues = this.loginForm;

    const username = this.loginForm.get('username')?.value!;
    const password = this.loginForm.get('password')?.value!;

    const user: ILogin = {
      username,
      password
    }

    this.loginSubscription =  this.authService.login(user)
                                                .subscribe(result => {

                                                  this.storageService.addToStorage("access_token", result);


                                                  this.alertifyService.success(`Welcome ${result.username}`);
                                                  this.router.navigate(['/categories'])
                                                });
  }

  formNotValid() {
    return  !this.loginForm.valid
   }

  hasError(key: string) {

    const isEmpty: boolean = this.loginForm.get(key)?.value == ""

    return this.loginForm.get(key)?.pristine || (isEmpty)
  }

  ngOnDestroy(): void {

    if(this.loginSubscription){
      this.loginSubscription.unsubscribe()
    }
  }

}
