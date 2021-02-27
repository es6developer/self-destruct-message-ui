import { Injectable } from '@angular/core';
@Injectable()

export class AuthService {
  constructor() { }
  // ...
  public isAuthenticated(): Boolean {
    const token = localStorage.getItem('user');
    return token != null ? true : false;
  }
  public setUserToken(value: string): Boolean {
    localStorage.setItem('user', value);
    return true
  }
}
