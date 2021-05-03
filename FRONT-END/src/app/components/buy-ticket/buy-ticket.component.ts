import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { TokenStorageService } from './../../services/token-storage.service';
import { AppGlobals } from './../../globals/app-globals';
import { UserModel } from './../../models/oussama/user';
import { Stadium } from './../../models/oussama/stadium';
import { Game } from 'src/app/models/oussama/game';
import { Ticket } from './../../models/oussama/ticket';
import { TicketService } from './../../services/ticket.service';
import { GameService } from './../../services/game.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit, OnDestroy {

  buyTicketForm!: FormGroup;

  public gamesSubscription!: Subscription;
  public ticketsSubscription!: Subscription;

  public modalText: string="le payement est effectué avec success ,veuillez récuperer votre billet auprés des gichets à l'aide de l'identifiant suivant : ";
  public showModal: boolean = false ;
  public redirectURL: string = "/login";

  public showErrorText = false;

  private static TicketTypePriceMapper :any= {VIRAGE:25,PELOUSE:30,ENCEINTE_INF:40,ENCEINTE_SUP:50};

  public games!: Game[];
  public tickets!: Ticket[];

  public otherTicketTypes: any[] = [];

  public selectedGameId: number=0;

  constructor(
    private formBuilder: FormBuilder,
    private gameService:GameService,
    private ticketService: TicketService,
    private appGlobals: AppGlobals,
    private tokenService:TokenStorageService,
    private router: ActivatedRoute
  ) {}

  public onSubmitForm() {
    this.showErrorText = false;
    const _this = this;
      //submitting the form
      const values = this.buyTicketForm.value;
      const ticketPrice =  BuyTicketComponent.TicketTypePriceMapper[""+values["ticketType"]+""];
      const paymentHandler = (<any>window).StripeCheckout.configure({
         locate:"auto",
         key:"pk_test_SEAYm5fgGBDbaX9ET8tKI6fJ00Hvrm6FFa",
         token: function(stripeToken: any) {
           const g = new Game(_this.selectedGameId,undefined,undefined,undefined,_this.games[0].stadium);
           
           const token = _this.tokenService.getToken();
           const s = new UserModel("","",_this.appGlobals.getUserEmail(token),"",_this.appGlobals.getUserIdentifier(token));
         
           const t = new Ticket(values["ticketType"],g,ticketPrice,s);
           //here constructingnticket object and assciated {spectator obj & game obj}   --> 
           //after we invoke this.ticketService.buyTicket(t) 
            _this.ticketService.buyTicket(t).then((data: any) => {
              _this.redirectURL = _this.router.snapshot.url.join('');
              _this.modalText += data.uuid;
              _this.showModal = true;
           },(errors : any) => {
               console.log(errors)
               _this.showErrorText = true;
          }); 

          console.log(stripeToken.card);
         }
      });

      paymentHandler.open({
        name:"Tickets du coupe de monde 2022",
        descriptions:"achats des tickets pour les match de coupe de monde 2022 à Qatar",
        amount : ticketPrice * 100
      });
  }

  private invokeStripeGATEWAY() {
    if(!window.document.getElementById("stripe-script")) {
      const script = window.document.createElement("script");
      script.id="stripe-script";
      script.type="text/javascript";
      script.src="https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(script);
    }
  }

  public getNbrAvailableTicketsInt(all: number | undefined, buyed:number | undefined) {
    if(all && buyed) {
     const res = all - buyed;
     return res
   }
   return 0
  }

  public getNbrAvailableTickets(all: number | undefined, buyed:number | undefined) {
    if(all && buyed) {
     const res = all - buyed;
     return res+" tickets";
   }
   return ""
  }

  ngOnInit() {
    this.invokeStripeGATEWAY();
    this.initSignUpForm();

    this.gamesSubscription = this.gameService.gamesSubject.subscribe((data)=>{
      if(Array.isArray(data)) {
         this.games = data;
         console.log(this.games);
      }else{
        
      }
    });


    this.ticketsSubscription = this.ticketService.ticketSubject.subscribe(
      (data)=>{
        if(Array.isArray(data)) {
          console.log(data);
          this.tickets = data;

          const types=["VIRAGE","PELOUSE","ENCEINTE_SUP","ENCEINTE_INF"];
          const types1=["VIRAGE","PELOUSE","ENCEINTE SUPERIEUR","ENCEINTE INFERIEUR"];
          const values = ["virageNCap","viragePelCap","virageEncSupCap","virageEncInfCap"]
         
          var stadium: Stadium = new Stadium(0,"",0,0,0,0,0)
          for(var i=0;i<this.games.length;i++) {
            if(this.games[i].id == this.selectedGameId) {
              stadium =  this.games[i].stadium;
            }
          }

          var test=false;
          var j=0;
          for(var i=0;i<types.length;i++) {
              test=false;
              j=0;
              while(!test && j<data.length) {
                test = (data[j].type == types[i]) ;
                j++;
              }
              if(!test) {
                switch(i) {
                  case 0:
                    this.otherTicketTypes.push({t:types[i],type:types1[i]+ "(25$)",capacity:stadium.virageNCap+ stadium.virageSCap});
                  break;
                    
                  case 1:
                    this.otherTicketTypes.push({t:types[i],type:types1[i]+ "(30$)",capacity:stadium.viragePelCap});
                  break;
                   
                  case 2:
                    this.otherTicketTypes.push({t:types[i],type:types1[i]+ "(50$)",capacity:stadium.virageEncSupCap});
                  break;

                  case 3:
                    this.otherTicketTypes.push({t:types[i],type:types1[i]+ "(40$)",capacity:stadium.virageEncInfCap});
                  break;                    
                }
              }
          }
        }else{
    
        }
    })
    this.gameService.getCurrentTourGames();
  }

  public onChooseGame(gameId: number) {
      if(gameId!=null) {
        this.otherTicketTypes = [];
         this.selectedGameId = gameId;
         this.ticketService.getNbrBuyedTicketsPerType(gameId);
      }
  }

 
  initSignUpForm() {
    this.buyTicketForm = this.formBuilder.group({
      game: ["",Validators.required],
      nbrTickets: ["1",Validators.required],
      ticketType: ["VIRAGE",Validators.required]
    });
  }

  ngOnDestroy() {
    this.ticketsSubscription.unsubscribe();
    this.gamesSubscription.unsubscribe();
  }

}
