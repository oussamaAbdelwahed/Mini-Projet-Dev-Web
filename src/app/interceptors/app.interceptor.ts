
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  
} from '@angular/common/http';
import { of, throwError } from 'rxjs';

import {catchError} from 'rxjs/operators'; 

import { Router } from '@angular/router';

import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable( {providedIn: 'root'})
export class AppInterceptor implements HttpInterceptor {
    constructor(private router: Router, private tokenStorage: TokenStorageService)  {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("INTERCEPTOR  INTERCEPTION MECHANISM WORKS")
      
      const token = this.tokenStorage.getToken();
     
      //a verifier cette methode (elle retourne faux malgré que le user est logged in)
      //this.tokenStorage.isLoggedIn()
      if (token != null  ) {
        console.log("HERE")
        const cloned = req.clone({
          headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
        });

        return next.handle(cloned);
      } else {
         //this.router.navigate(['Login']);
         this.router.navigate(['login']);
         if(!req.url.includes("generate-token")) {
           return next.handle(req).pipe(catchError(x => this.handleAuthError(x)));
          }else    {
            return next.handle(req)
          }
      }
  }


  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403 ) {
      console.log(err.headers.keys())
      console.log("UNAUTHORIZED STATUS INTERCEPTED = "+err.status)
      this.tokenStorage.logItOut();
      this.router.navigateByUrl("/");

      return of(err.message); 
    }
    return throwError(err);
}
}
