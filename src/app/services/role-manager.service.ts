import { StorageService } from 'src/app/services/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { IToken, Role } from 'src/types/auth';

@Injectable({
  providedIn: 'root'
})
export class RoleManagerService {

  constructor(private jwtService: JwtHelperService,private storageService: StorageService) { }

  userHasRole(role: Role): boolean {

    const decodedToken = this.getRoleToken();

    return this.roleInToken(decodedToken, role);

  }

  getRoleToken(): any {
    const token = this.getToken();

    if(token)
    {
      const decodedToken = this.jwtService.decodeToken(token);

      return decodedToken;
    }

    return "";
  }

  private roleInToken(decodedToken: any, role: Role) {

    if(decodedToken)
    {

      if(this.tokenHasRole(decodedToken, role))
      {
        return true
      }

    }

    return false;
  }

  private tokenHasRole(decodedToken: any, role: Role): boolean {

    if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == role)
    {
      return true
    }

    return false;
  }

  checkIfRolesAuthorized(roles: Role[]): boolean {

    const decodedToken = this.getRoleToken();

    if(decodedToken)
    {

      const authorizedRoles =  this.getAuthorizedRoles(roles);

      if(! this.isEmpty(authorizedRoles) )
      {
        return true;
      }

    }

    return false;

  }


  getToken(): string | null {
    const token = this.storageService.getFromStroage<IToken>("access_token");

    if(token != null && typeof token != "string") {
      return token.token
    }

    return null

  }

  private getAuthorizedRoles(roles: Role[]): Role[] {
    return roles.filter(role =>  this.userHasRole(role))
  }

  private isEmpty(list: any[]): boolean {
    return list.length == 0
  }

}
