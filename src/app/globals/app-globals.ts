import { Injectable } from "@angular/core";
import { UserModel } from "../models/user";


@Injectable( {providedIn: 'root'})
export class AppGlobals {
    readonly ApiBaseUrl: string = "http://localhost:8080";

    getUTF8(base64string: string, key?: string) {
      const tokenThreeParts = base64string.split(".");
      const utf8String = atob(tokenThreeParts[1]);
    
      const jsonObject = JSON.parse(JSON.parse(utf8String)["scopes"].split(";")[0])
      if (!key) {
        return jsonObject;
      }
      return jsonObject[key];
    }

    //false method --> should be getUserRoles: List<String> and with another login of IMPL ---> TODO NEXT TIME
    getUserRole(token: string) {
      const userInfos = this.getUTF8(token);
      if (userInfos) {
        const role = userInfos.scopes
        return role;
      }
      return '';
    }

    getUserIdentifier(token: string): number {
      const userInfos = this.getUTF8(token);
      if (userInfos) {
        const identifier = userInfos['id'];
        return identifier;
      }
      return -1;
    }


    getUserEmail(token: string) {
       const userInfos = this.getUTF8(token);
       if (userInfos) {
         const email = userInfos.sub;
         return email;
       }
       return '';
    }

    isAdmin(role: string): boolean {
       return role === 'ROLE_ADMIN';
    }

   
    isSpectator(role: string): boolean {
      return role === 'ROLE_SPECTATOR';
    }

    isReferee(role: string): boolean {
        return role === 'ROLE_REFEREE';
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
}
