import { StorageService } from './../../service/storage.service';
import { IRegister } from './../../../types/auth';
import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy  {

  registerSubscription!: Subscription;

  constructor(
    private alertifyService: AlertifyService,
    private AuthService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  register() {

    const registerFormValues = this.registerForm;

    const username = this.registerForm.get('username')?.value!;
    const email = this.registerForm.get('email')?.value!;
    const password = this.registerForm.get('password')?.value!;

    const user: IRegister = {
      username,
      email,
      password
    }

    this.registerSubscription =  this.AuthService.register(user)
                                                  .subscribe(result => {
                                                    this.alertifyService.success("user created successfully");
                                                    this.router.navigate(['/authentication/login'])
                                                  });
  }

  formNotValid() {
    return  !this.registerForm.valid
   }

  hasError(key: string) {

    const isEmpty: boolean = this.registerForm.get(key)?.value == ""

    return this.registerForm.get(key)?.pristine || (isEmpty)
  }

  ngOnDestroy(): void {

    if(this.registerSubscription){
      this.registerSubscription.unsubscribe()
    }
  }


}
