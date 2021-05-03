import { AppGlobals } from './../globals/app-globals';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminMiddleware implements CanActivate {
  constructor(private router: Router, private globals: AppGlobals) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.globals.isAdmin()) {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }
  
}
