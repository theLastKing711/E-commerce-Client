import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppUserRoutingModule } from './app-user-routing.module';
import { IndexComponent } from './index/index.component';
import { AppUserDetailsComponent } from './app-user-details/app-user-details.component';
import { AddAppUserDialogComponent } from './add-app-user-dialog/add-app-user-dialog.component';


@NgModule({
  declarations: [
    IndexComponent,
    AppUserDetailsComponent,
    AddAppUserDialogComponent,
  ],
  imports: [
    CommonModule,
    AppUserRoutingModule,
    SharedModule
  ]
})
export class AppUserModule { }
