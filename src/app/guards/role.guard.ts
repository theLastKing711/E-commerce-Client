import { AuthService } from 'src/app/services/auth.service';
import { RoleManagerService } from './../services/role-manager.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/types/auth';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private roleService: RoleManagerService,
             private authSErvice: AuthService,
             private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {

      const data = route.data;

      const authorizedRolesForRoute: Role[] = data["roles"]

      if(this.roleService.checkIfRolesAuthorized(authorizedRolesForRoute))
      {
        return true
      }

      this.authSErvice.logout();
      this.router.navigate(['/authentication/login'])
      return false;

  }

}
