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
export class AddAppUserDialogComponent implements OnInit {

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
   password: new FormControl(''),
   image: new FormControl('', Validators.required)
 });

 ngOnInit(): void {
 }


uploadFile(e: any) {
    const file = e.target.files[0];

    this.productForm.patchValue({
      image: file
    })

  }

 formNotValid() {
  return  !this.productForm.valid
 }

 addAppUser() {

  this.loading = true;

   const formData = new FormData();

   const form = this.productForm;

   const username = form.get('username')?.value!;

   const email = form.get('email')?.value!;

   const password = form.get('password')?.value!;

   const image = form.get('image')?.value!;

   formData.append("username", username);

   formData.append('email', email);

   formData.append('password', password);

   formData.append('image', image);


   this.appUserService.addAppUser(formData)
                       .subscribe(appUser => {
                         this.dialogService.sendUser(appUser);
                         this.alertifyService.success("Product added successfully")
                         this.loading = false;
                         this.dialogRef.close();
                       })
 }


 hasError(key: string) {

   const isEmpty: boolean = this.productForm.get(key)?.value == ""

   return this.productForm.get('name')?.pristine || (isEmpty)
 }

}
