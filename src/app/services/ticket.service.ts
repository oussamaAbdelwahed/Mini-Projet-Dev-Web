import { Ticket } from './../models/ticket';
import { AppGlobals } from './../globals/app-globals';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  public ticketSubject : Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient,public appGlobals: AppGlobals) { }
  
  public getNbrBuyedTicketsPerType(gameId:number) {
    this.httpClient.get<Ticket[]>(this.appGlobals.ApiBaseUrl+ "/ticket/buyed-tickets-per-type/"+gameId).subscribe(
     (data: Ticket[]) => {
       this.emitSubject(data);  
     },(error) => {
         this.emitSubject(error);
     }
    )
  }

  public buyTicket(t: Ticket)  {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<Ticket>(
          this.appGlobals.ApiBaseUrl + '/ticket/buy-ticket',
          t
        )
        .subscribe(
          (successData) => {
            console.log(successData)
            resolve(successData);
          }, 
          (errorData) => {
            console.log(errorData)
            reject(errorData);
          }
        );
      });
  }

  private emitSubject(data:any) {
    this.ticketSubject.next(data);
  }

}
