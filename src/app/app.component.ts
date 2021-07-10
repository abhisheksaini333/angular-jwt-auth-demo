import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-jwt-demo';
  isLoggedIn = false;

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) {
    this._authenticationService.currentUser.subscribe(x => {
      if (x && JSON.stringify(x) != '{}') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  logout() {
    this._authenticationService.logout();
    this._router.navigate(['/login'])
  }
}
