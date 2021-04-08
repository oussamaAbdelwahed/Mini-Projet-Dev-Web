import { Spectator } from './../models/spectator';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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

  public getSpectatorsPage(pageIndex: number) {
    this.httpClient.get<Spectator[]>(this.globals.ApiBaseUrl+ "/spectator/all/"+pageIndex).subscribe(
      (data: Spectator[]) => {
        this.emitSpectatorSubject(data);  
      },(error) => {
        this.emitSpectatorSubject(error);
      }
     )
  }


  private emitSpectatorSubject(data: any) {
     this.spectatorSubject.next(data)
  }
}
