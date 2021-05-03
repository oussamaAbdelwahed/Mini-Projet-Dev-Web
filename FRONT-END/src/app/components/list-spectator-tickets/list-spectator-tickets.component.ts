import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AppGlobals } from './../../globals/app-globals';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-list-spectator-tickets',
  templateUrl: './list-spectator-tickets.component.html',
  styleUrls: ['./list-spectator-tickets.component.css']
})
export class ListSpectatorTicketsComponent implements OnInit,OnDestroy {
  public ticketsSubscription!: Subscription;
  public tickets:[];

  constructor(
    private ticketService: TicketService,
    private globals:AppGlobals,
    private tss:TokenStorageService
  ) {}

  ngOnInit(): void {
    this.ticketsSubscription = this.ticketService.ticketSubject.subscribe(
      (data)=>{
        this.tickets = data;
      },(error)=>{
        console.log(error);
      }
    );
    this.ticketService.getAllTicketsOfLoggedInSpectator(this.globals.getUserIdentifier(this.tss.getToken()));
  }

  ngOnDestroy(): void {
     this.ticketsSubscription.unsubscribe();
  }



}
