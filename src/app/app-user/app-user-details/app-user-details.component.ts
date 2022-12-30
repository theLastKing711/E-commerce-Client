import { SubSink } from 'subsink';
import { IRoleItem, Role } from 'src/types/auth';
import { RoleManagerService } from './../../services/role-manager.service';
import { LoadingService } from './../../loading.service';
import { AppUserService } from 'src/app/services/app-user.service';
import { AppUser, AddAppUser } from 'src/types/appUser';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { switchMap, Observable, forkJoin, Subject } from 'rxjs';
import { roleHintsMessages } from 'src/app/constants/constants';



@Component({
  selector: 'app-app-user-details',
  templateUrl: './app-user-details.component.html',
  styleUrls: ['./app-user-details.component.scss']
})
export class AppUserDetailsComponent implements OnInit {

  roleHints = roleHintsMessages;

  id!: number;
  appUser!: AppUser
  roles!: IRoleItem[];
  subs: SubSink = new SubSink();
  imgUrl!: string;
  imagesPath: string = environment.imagesPath;

  removeUser: Subject<number> = new Subject<number>();
  removeUser$: Observable<number> = this.removeUser.asObservable();
  loading$!: Observable<boolean>;

  constructor(private appUserService: AppUserService,
              private roleService: RoleManagerService,
              private route: ActivatedRoute,
              private router: Router,
              private alertifyService: AlertifyService,
              private loadingService: LoadingService
              ) {
                this.loading$ = this.loadingService.isLoading$;
              }

  appUserForm = new FormGroup({
    id: new FormControl(''),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    roleName: new FormControl('', [Validators.required]),
    image: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap.pipe(switchMap(param => {

      this.loadingService.showLoading();

      const id = parseInt(param.get('id')!);

      this.appUserForm.patchValue({
        id: id.toString()
      })

      this.id = id;
      return forkJoin([this.appUserService.getAppUserById(id), this.roleService.getAllRoles()])

    }))
    .subscribe( ([user, roles]) => {

      this.appUser = {...user}

      this.roles = [...roles];

      this.updateFormWithUserData();

      this.loadingService.hideLoading();
    })

    this.subs.sink = this.removeUser$.pipe(
      switchMap(id => this.appUserService.removeAppUser(id))
    )
    .subscribe(_ => {
      this.alertifyService.success("users deleted succefully")
      this.router.navigate(['users'])
    })

  }

  updateFormWithUserData() {

    this.appUserForm.patchValue({
      username: this.appUser.username,
      password: "",
      email: this.appUser.email,
      roleName: this.appUser.roleName,
      image: this.appUser.imagePath,
    })

  }

  uploadFile(e: any) {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imgUrl = reader.result as string;

    }

    reader.readAsDataURL(file);

    this.appUserForm.patchValue({
      image: file
    })

   }

   formNotValid() {
    return  !this.appUserForm.valid
   }

   updatAppUser() {

     this.loadingService.showLoading();

     const user = this.GetUserData(this.appUserForm);

     const userFormData: FormData = this.getUserFormData(user);

     this.subs.sink = this.appUserService.updateAppUser(userFormData, this.id)
                         .subscribe(appUser => {
                           this.alertifyService.success("appUser updated successfully");
                           this.loadingService.hideLoading();
                           this.router.navigate(['/users']);
                         })
   }

   GetUserData(form: FormGroup<any>): AddAppUser {

    const id = form.get('id')?.value;

      const username = form.get('username')?.value!;

      const email = form.get('email')?.value!;

      const password = form.get('password')?.value!;

      const roleName = form.get('roleName')?.value!;

      const image = form.get('image')?.value!;

      const user: AddAppUser = {
        id,
        username,
        email,
        password,
        image: image,
        roleName,
      }

      return user

   }

   getUserFormData(user: AddAppUser): FormData {

      const formData: FormData = new FormData();

      formData.append("id", this.id.toString());

      formData.append("username", user.username!);

      formData.append('email', user.email!);

      formData.append('password', user.password!);

      formData.append('roleName', user.roleName!);

      formData.append('image', user.image!);

      return formData;
   }

   getRoleHint() {
    return this.roleHints[this.appUserForm.get('roleName')?.value!]
   }

   hasError(key: string, errorName: string) {

    const isEmpty: boolean = this.appUserForm.get(key)?.hasError(errorName)!;

    return isEmpty
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
