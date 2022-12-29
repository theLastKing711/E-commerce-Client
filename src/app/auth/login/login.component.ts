import { AuthService } from './../../services/auth.service';
import { ILogin } from './../../../types/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    ) { }

  ngOnInit(): void {

  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  login() {

    const username = this.loginForm.get('username')?.value!;
    const password = this.loginForm.get('password')?.value!;

    const user: ILogin = {
      username,
      password
    }

    this.loginSubscription =  this.authService.login(user)
                                              .subscribe();
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
