import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Injectable } from "@angular/core";
import { UserModel } from "../models/oussama/user";


@Injectable( {providedIn: 'root'})
export class AppGlobals {
    readonly ApiBaseUrl: string = "http://localhost:8080";
    readonly TichetType = {VIRAGE:"VIRAGE",PELOUSE:"PELOUSE",ENCEINTE_INF:"ENCEINTE_INF",ENCEINTE_SUP:"ENCEINTE_SUP"}
    readonly ROLE_ADMIN="ROLE_ADMIN";
    readonly ROLE_REFEREE="ROLE_REFEREE";
    readonly ROLE_SPECTATOR = "ROLE_SPECTATOR";

    constructor(private tokenStorageService : TokenStorageService) {}

    private getTokenData(base64string: string) {
      const tokenThreeParts = base64string.split(".");
      const utf8String = atob(tokenThreeParts[1]);
    
      const jsonObject = JSON.parse(utf8String)["scopes"].split(";");
      return jsonObject;
    }

    getUTF8(base64string: string, key?: string) {
      const jsonObject = JSON.parse(this.getTokenData(base64string)[0])
      if (!key) {
        return jsonObject;
      }
      return jsonObject[key];
    }

    //false method --> should be getUserRoles: List<String> and with another login of IMPL ---> TODO NEXT TIME
    getUserRoles(token: string | null) {
     if(token !== null) {
       const r =  this.getTokenData(token);
       r.shift();
       return r;
     }
     return [];
    }

    getUserIdentifier(token: string | null): number {
      if(token !== null) {
       const userInfos = this.getUTF8(token);
       if (userInfos) {
        const identifier = userInfos['id'];
        return identifier;
       }
      }
      return -1;
    }


    getUserEmail(token: string | null) {
      if(token !== null) {
       const userInfos = this.getUTF8(token);
       if (userInfos) {
         const email = userInfos.sub;
         return email;
       }
      }
       return '';
    }

    isAdmin(): boolean {
      const roles =  this.getUserRoles(this.tokenStorageService.getToken());
      return roles.includes(this.ROLE_ADMIN);
    }

   
    isSpectator(): boolean {
      const roles =  this.getUserRoles(this.tokenStorageService.getToken());
      return roles.includes(this.ROLE_SPECTATOR);
    }

    isReferee(): boolean {
      const roles =  this.getUserRoles(this.tokenStorageService.getToken());
      return roles.includes(this.ROLE_REFEREE);
    }
  

   createUserModelFromObject(userObject: object): UserModel {
      const user: UserModel = new UserModel('', '' , '', '');
      
      for (const [key, value] of Object.entries(userObject)) {
        switch(key) {
            case 'firstName' : 
               user.firstname = value
            break;
            case 'lastName' : 
               user.lastname = value
            break;
            case 'email' : 
               user.email = value
            break;
            case 'id' : 
               user.id = value
            break;
            case 'role' : 
               user.role = value
            break;
            case 'dateNaiss' : 
              user.dateNaiss = value
            break;
        }
      }
      return user;
    }

     formatDate(d : Date) {
         var month = '' + (+d.getMonth + 1)
         var day = '' + d.getDate
         var year = d.getFullYear
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
}
