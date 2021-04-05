import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppGlobals } from '../globals/app-globals';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userSubject: Subject<any> = new Subject<any>();

  constructor(
    private httpClient: HttpClient,
    private globals: AppGlobals
    ) {}

  public addUser(u: UserModel) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<UserModel>(
          this.globals.ApiBaseUrl + '/spectator/signup',
          u
        )
        .subscribe(
          (successData) => {
            resolve(successData);
          }, 
          (errorData) => {
            reject(errorData);
          }
        );
      });
  }


  private emitUserSubject(data: any) {
     this.userSubject.next(data)
  }
}
