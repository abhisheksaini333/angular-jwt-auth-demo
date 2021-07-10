import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: Observable<any>;
  private currentUserSubject: BehaviorSubject<any>;

  constructor(
    private _httpClient: HttpClient
  ) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() : any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this._httpClient.post<any>(
      `https://stormy-stream-92408.herokuapp.com/api/users/login`,
      {
        username: email,
        password: password
      }
    ).pipe(map(user => {
      // set the user data to the localstorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }))
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
