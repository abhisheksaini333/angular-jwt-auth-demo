import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if user is logged In, it means FE has a JWT token, return true
    const jwtToken = this._authenticationService.getToken();
    if (jwtToken && JSON.stringify(jwtToken) !== '{}') {
      return true;
    }

    // if not, return false;
    this._router.navigate(['/login']);
    return false;
  }
}
