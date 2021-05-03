import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication.service';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthMiddleware implements CanActivate {
    constructor(private router: Router, private tokenStorage: TokenStorageService) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
         if(this.tokenStorage.getToken() != null) {
            return true;
         }
         this.router.navigateByUrl('/');
         return false;
    }
}
