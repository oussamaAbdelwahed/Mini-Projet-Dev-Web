import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppGlobals } from '../globals/app-globals';
import { LoginUser } from '../models/oussama/loginUser';
import { TokenModel } from '../models/oussama/token';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authSubject: Subject<any> = new Subject<any>();
  private  token?: TokenModel;

  constructor(
    private httpClient: HttpClient,
    private globals: AppGlobals,
    private tokenStorage: TokenStorageService,
  ) {}

  public test() {
    this.httpClient.get(this.globals.ApiBaseUrl+"/test/users").subscribe((sucessData: any)=> {
           console.log(sucessData)
    },(errorData: any) => {

    })
  }
  public attemptAuth(loginUser: LoginUser,buyTicketRedirected=false) {
    this.httpClient
      .post<TokenModel>(
        this.globals.ApiBaseUrl + "/token/generate-token",
        loginUser
      ).subscribe(
        (successData: TokenModel) => {
          console.log(successData)
          this.saveAuthCredentials(successData);
          localStorage.setItem("id",this.globals.getUserIdentifier(successData.token).toString());
          this.emitAuthSubject(true);
        },
        (errorData: HttpErrorResponse) => {
          if (errorData.hasOwnProperty('error')) {
               console.log(errorData.error)
               this.emitAuthSubject(errorData.error["message"]);
          } else {
              this.emitAuthSubject(false);
          }
        }
      );
  }

  emitAuthSubject(data: any) {
    this.authSubject.next(data);
  }

  saveAuthCredentials(tokenModel: TokenModel): void {
    this.tokenStorage.saveToken(tokenModel.token);
    //this.tokenStorage.saveExpirationDate(tokenModel.expirationDateAndTime);
  }
}
