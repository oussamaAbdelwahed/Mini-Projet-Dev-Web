import { AppGlobals } from './../globals/app-globals';
import { Game } from './../models/game';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public gamesSubject: Subject<any> = new Subject<any>();
  constructor(private httpClient: HttpClient, private globals: AppGlobals) { }

  public getCurrentTourGames() {
      this.httpClient.get<Game[]>(this.globals.ApiBaseUrl+"/game/current-tour-games").subscribe(
        (data: Game[])=>{
           this.emitGamesSubject(data)
        },(error)=> {
           this.emitGamesSubject(error)
        }
      )
  }

  public getAllGames() {
    this.httpClient.get<Game[]>(this.globals.ApiBaseUrl+"/game/all").subscribe(
      (data: Game[])=>{
         this.emitGamesSubject(data)
      },(error)=> {
         this.emitGamesSubject(error)
      }
    )
  }

  private emitGamesSubject(data: any) {
    this.gamesSubject.next(data);
  }
}
