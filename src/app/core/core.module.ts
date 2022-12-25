import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { SearchComponent } from './search/search.component';
import { ForRoleDirective } from '../shared/directives/for-role.directive';


@NgModule({
  declarations: [
    HeaderComponent,
    AsideComponent,
    SearchComponent,
    ForRoleDirective
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    AsideComponent,
    ForRoleDirective

  ]
})
export class CoreModule { }
