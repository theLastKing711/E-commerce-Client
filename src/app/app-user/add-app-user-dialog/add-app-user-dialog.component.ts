import { Observable } from 'rxjs';
import { RoleManagerService } from './../../services/role-manager.service';
import { AppUserService } from 'src/app/services/app-user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IndexComponent } from '../index/index.component';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppUserDialogService } from 'src/app/services/app-user-dialog.service';
import { IRoleItem } from 'src/types/auth';
import { AppUser } from 'src/types/appUser';
import { roleHintsMessages } from 'src/app/constants/constants';

@Component({
  selector: 'app-add-app-user-dialog',
  templateUrl: './add-app-user-dialog.component.html',
  styleUrls: ['./add-app-user-dialog.component.scss']
})
export class AddAppUserDialogComponent implements OnInit {

  roleHints = roleHintsMessages;

  roles$!: Observable<IRoleItem[]>;

  constructor(
      private appUserService: AppUserService,
      public dialogRef: MatDialogRef<IndexComponent>,
      public dialogService: AppUserDialogService,
      private alertifyService: AlertifyService,
      private roleService: RoleManagerService
  ) {}


  ngOnInit(): void {
    this.roles$ = this.roleService.getAllRoles();
  }

  loading: boolean = false;


  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    roleName: new FormControl('', [Validators.required]),
    image: new FormControl('', Validators.required)
  });

  uploadFile(e: any) {
    const file = e.target.files[0];

    this.userForm.patchValue({
      image: file
    })

  }

  formValid() {
    return  this.userForm.valid
  }

  addAppUser() {

    this.loading = true;

    const user = this.GetUserData(this.userForm);

    const userFormData: FormData = this.getUserFormData(user)

    this.appUserService.addAppUser(userFormData)
                        .subscribe(appUser => {
                          this.dialogService.sendUser(appUser);
                          this.alertifyService.success("Product added successfully")
                          this.loading = false;
                          this.dialogRef.close();
                        })
  }


  GetUserData(form: FormGroup<any>): Partial<AppUser> {

    const username = form.get('username')?.value!;

    const email = form.get('email')?.value!;

    const password = form.get('password')?.value!;

    const roleName = form.get('roleName')?.value!;

    const image = form.get('image')?.value!;

    const user: Partial<AppUser> = {
      username,
      email,
      password,
      imagePath: image,
      roleName,
    }

    return user

  }

  getUserFormData(user: Partial<AppUser>): FormData {

    const formData: FormData = new FormData();

    formData.append("username", user.username!);

    formData.append('email', user.email!);

    formData.append('password', user.password!);

    formData.append('roleName', user.roleName!);

    formData.append('image', user.imagePath!);

    return formData;
  }

  getRoleHint() {
    return this.roleHints[this.userForm.get('roleName')?.value!]
  }

 hasError(key: string, errorName: string) {

   const isEmpty: boolean = this.userForm.get(key)?.hasError(errorName)!;

   return  isEmpty
 }

}
