import { IRoleItem } from './../../types/auth';
import { StorageService } from 'src/app/services/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { IToken, Role } from 'src/types/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleManagerService {

  authUrl: string = `${environment.base_url}AppUsers/`;

  constructor(
    private jwtService: JwtHelperService,
    private storageService: StorageService,
    private httpClient: HttpClient
    ) { }

  getAllRoles(): Observable<IRoleItem[]> {

    const rolesRoute: string = `${this.authUrl}Roles`

    return this.httpClient.get<IRoleItem[]>(rolesRoute)

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


  private getToken(): string | null {
    const token = this.storageService.getFromStroage("access_token") as IToken;

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

  userHasRole(role: Role): boolean {

    const decodedToken = this.getRoleToken();

    return this.roleInToken(decodedToken, role);

  }

  private getRoleToken(): any {
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


}
