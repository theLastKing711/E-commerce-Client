import { RoleManagerService } from './../../services/role-manager.service';
import { Role } from './../../../types/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appForRole]'
})
export class ForRoleDirective implements OnInit {

  @Input('appForRole') roles!: Role[];

  constructor(private template: TemplateRef<any>,
              private  container: ViewContainerRef,
              private roleService: RoleManagerService) { }

  ngOnInit(): void {

    if(this.RolesHasAccess())
    {
      this.container.createEmbeddedView(this.template)
    }

  }


  RolesHasAccess(): boolean {

    return this.roleService.checkIfRolesAuthorized(this.roles);

  }


}
