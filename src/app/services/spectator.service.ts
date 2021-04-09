import { Spectator } from './../models/spectator';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppGlobals } from '../globals/app-globals';

@Injectable({
  providedIn: 'root'
})
export class SpectatorService {

  public spectatorSubject: Subject<any> = new Subject<any>();

  constructor(
    private httpClient: HttpClient,
    private globals: AppGlobals
    ) {}

  public getSpectatorsPage(pageIndex: number,pageSize=2,gameId="",searchQuery="") : Observable<Spectator[]> {
    return  this.httpClient.get<Spectator[]>(this.globals.ApiBaseUrl+ "/spectator/all/"+pageIndex,
      {
          params: new HttpParams()
          .set('gameId', gameId.toString())
          .set('pageSize', pageSize.toString())
          .set("searchQuery",searchQuery)
      }
    );
  }

  public getSpectatorById(id:number){
      this.httpClient.get<Spectator>(this.globals.ApiBaseUrl+"/spectator/"+id.toString()+"/get").subscribe(
        (data: Spectator)=>{
          this.emitSpectatorSubject(data);
      },(error)=>{
        this.emitSpectatorSubject(error);
      });
  }

  public updateSpectator(s:Spectator) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.globals.ApiBaseUrl+"/spectator/"+s.id+"/update",s).subscribe(
        (data)=>{
           resolve(data);
        },(error)=>{
           reject(error);
        }
     )
    });
 
  }


  private emitSpectatorSubject(data: any) {
     this.spectatorSubject.next(data)
  }
}
