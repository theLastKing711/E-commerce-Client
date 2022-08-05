import { AppUserService } from 'src/app/services/app-user.service';
import { AppUser } from 'src/types/appUser';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-app-user-details',
  templateUrl: './app-user-details.component.html',
  styleUrls: ['./app-user-details.component.scss']
})
export class AppUserDetailsComponent implements OnInit {

  id!: number;
  appUser!: AppUser

  deletAppUserrSubscription!: Subscription;
  updatAppUserrSubscription!: Subscription;

  imgUrl!: string;

  categoriesSubscription!: Subscription;

  imagesPath: string = environment.imagesPath;

  loading: boolean = false;

  constructor(private appUserService: AppUserService,
              private route: ActivatedRoute,
              private router: Router,
              private alertifyService: AlertifyService
              ) { }

  appUserForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    image: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap(param => {
      this.loading = true;
      const id = parseInt(param.get('id')!);
      this.id = id;
      return this.appUserService.getAppUserById(id)

    }))
    .subscribe(result => {

      const appUser = result

      this.appUser = {...appUser as AppUser}

      console.log("app user", this.appUser)

      this.appUserForm.patchValue({
        username: this.appUser.username,
        password: "",
        email: this.appUser.email,
        image: this.appUser.imagePath,
      })

      this.loading = false;
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

    this.loading = true;


     const formData = new FormData();

     const form = this.appUserForm;

     const username = form.get('username')?.value!;

     const email = form.get('email')?.value!;

     const password = form.get('password')?.value!;

     const image = form.get('image')?.value!;



     formData.append("id", this.id.toString());

     formData.append("username", username);

     formData.append('email', email);

     formData.append('email', password);

     formData.append('image', image);


     this. updatAppUserrSubscription = this.appUserService.updateAppUser(formData, this.id)
                         .subscribe(appUser => {
                           this.alertifyService.success("appUser updated successfully");
                           this.loading = false;
                           this.router.navigate(['/appUsers']);
                         })
   }


   hasError(key: string) {

     const isEmpty: boolean = this.appUserForm.get(key)?.value == ""

     return this.appUserForm.get(key)?.pristine || (isEmpty)
   }

   removeAppUser(id: number) {
    this.deletAppUserrSubscription = this.appUserService.removeAppUser(id)
                                      .subscribe(() => {
                                        this.alertifyService.success("appUser deleted succefully")
                                        this.router.navigate(['appUsers'])
                                      })

   }

  ngOnDestroy(): void {

    if(this.deletAppUserrSubscription){
      this.deletAppUserrSubscription.unsubscribe();
    }

    if(this.categoriesSubscription)
    {
      this.categoriesSubscription.unsubscribe();
    }
  }

}
