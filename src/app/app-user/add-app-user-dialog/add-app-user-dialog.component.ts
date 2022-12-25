import { AppUserService } from 'src/app/services/app-user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IndexComponent } from '../index/index.component';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppUserDialogService } from 'src/app/services/app-user-dialog.service';

@Component({
  selector: 'app-add-app-user-dialog',
  templateUrl: './add-app-user-dialog.component.html',
  styleUrls: ['./add-app-user-dialog.component.scss']
})
export class AddAppUserDialogComponent {

  constructor(
      private appUserService: AppUserService,
      public dialogRef: MatDialogRef<IndexComponent>,
      public dialogService: AppUserDialogService,
      private alertifyService: AlertifyService
    ) {}

  loading: boolean = false;

 productForm = new FormGroup({
   username: new FormControl('', Validators.required),
   email: new FormControl('', [Validators.required, Validators.email]),
   password: new FormControl('', [Validators.required]),
   image: new FormControl('', Validators.required)
 });

  uploadFile(e: any) {
    const file = e.target.files[0];

    this.productForm.patchValue({
      image: file
    })

  }

 formValid() {
  return  this.productForm.valid
 }

 addAppUser() {

  this.loading = true;

   const userFormData: FormData = this.buildForm(this.productForm);

   this.appUserService.addAppUser(userFormData)
                       .subscribe(appUser => {
                         this.dialogService.sendUser(appUser);
                         this.alertifyService.success("Product added successfully")
                         this.loading = false;
                         this.dialogRef.close();
                       })
 }

 buildForm(form: FormGroup<any>): FormData {

  const username = form.get('username')?.value!;

  const email = form.get('email')?.value!;

  const password = form.get('password')?.value!;

  const image = form.get('image')?.value!;

  const formData = new FormData();

  formData.append("username", username);

  formData.append('email', email);

  formData.append('password', password);

  formData.append('image', image);

  return formData;

 }


 hasError(key: string) {

   const isEmpty: boolean = this.productForm.get(key)?.value == ""

   return this.productForm.get('name')?.pristine || (isEmpty)
 }

}
