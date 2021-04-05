import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {

  buyTicketForm!: FormGroup;
  public gamesSubscription!: Subscription;
  public games!: Game[];

  constructor(
    private formBuilder: FormBuilder,
    private gameService:GameService
  ) {}

  ngOnInit() {
    this.initSignUpForm();
    this.gamesSubscription = this.gameService.gamesSubject.subscribe((data)=>{
          if(Array.isArray(data)) {
            this.games = data;
            console.log(this.games);
          }else{
            //error here
          }
    });
    this.gameService.getCurrentTourGames();
  }

  public onSubmitForm() {
    
  }

 
  initSignUpForm() {
    this.buyTicketForm = this.formBuilder.group({
      game: ["",Validators.required],
      nbrTickets: ["1",Validators.required],
      ticketType: ["VIRAGE",Validators.required]
    });
  }

}
