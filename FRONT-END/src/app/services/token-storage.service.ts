import { Injectable } from '@angular/core';
import * as moment from 'moment';

const TOKEN_KEY = 'orgAuth';
const EXPIRATION_OF_TOKEN = 'tokenExpireIn';

@Injectable({providedIn:"root"})
export class TokenStorageService {
  constructor() {}
  public signOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(EXPIRATION_OF_TOKEN);
    window.localStorage.clear();
  }
  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public saveExpirationDate(expiresIn: string) {
    window.localStorage.removeItem(EXPIRATION_OF_TOKEN);
    window.localStorage.removeItem(EXPIRATION_OF_TOKEN);
    window.localStorage.setItem(EXPIRATION_OF_TOKEN, expiresIn);
  }

  public isLoggedIn(): boolean {
      const expiration = this.getExpiration();
      return moment().utcOffset(-60).isBefore(moment(expiration.toString()));
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  public getToken(): string | null {
    const token =  window.localStorage.getItem(TOKEN_KEY);
    return token;
  }

  getExpiration() {
    const expiresAt = localStorage.getItem(EXPIRATION_OF_TOKEN);
    if ( expiresAt ) {
         return expiresAt;
    }
    return false;
  }

  logItOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem("id");
    window.localStorage.removeItem(EXPIRATION_OF_TOKEN);
  }
}
