import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/game';
import { Referee } from 'src/app/models/referee';
import { Stadium } from 'src/app/models/stadium';
import { Team } from 'src/app/models/team';
import { Tour } from 'src/app/models/tour';
import { AdminService } from 'src/app/services/admin.service';
declare var $;
@Component({
  selector: 'app-gestion-games',
  templateUrl: './gestion-games.component.html',
  styleUrls: ['./gestion-games.component.css']
})
export class GestionGamesComponent implements OnInit, AfterViewInit {
  @ViewChild('dataTable',{static:false}) table ;
  dataTable : any ;

  public tourId:any;
  public tour : Tour ; 
  public gamesOfCurrentTour : Game[];

  public teams : Team[];
  public stadiums : Stadium[];
  public referees : Referee[];
  public asistantReferees: Referee[];
  public fourthOfficiels: Referee[];

  public editGame :Game;
  public deleteGame : Game;
  constructor(private adminService : AdminService ,private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getGamesOfCurrentTour();
    this.getTeams();
    this.getStadiums();
    this.getReferees();
    this.getAsistantReferees();
    this.getFourthOfficiels();
  }

  ngAfterViewInit(): void {
    this.dataTable=$(this.table.nativeElement);
    setTimeout(()=>{
    this.dataTable.DataTable({
      pagingType:'full_numbers',
      pageLength :10,
      processing:true,
      lengthMenu:  [5,10,25],
      order: [[1,"desc"]]
    });
  }, 500);
  }

  public getTourId():void {
      this._Activatedroute.paramMap.subscribe(params => { 
        this.tourId = params.get('tourId'); 
      });
  }
  public getTour(tourId:number):void {
    this.adminService.getTourById(tourId).subscribe (
      (response : Tour) => {
        this.tour=response ;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getGamesOfCurrentTour():void {
    this.getTourId();
    this.getTour(this.tourId);
    this.adminService.getGamesForTour(this.tourId).subscribe(
      (response : Game[]) => {
        this.gamesOfCurrentTour=response ;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getTeams():void {
    this.adminService.getTeamByWinner(true).subscribe(
      (response : Team[]) => {
        this.teams=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getStadiums():void {
    this.adminService.getAllStadiums().subscribe(
      (response : Stadium[]) => {
        this.stadiums=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getReferees():void {
    this.adminService.getRefereesByType("referee").subscribe(
      (response : Referee[]) => {
        this.referees=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getAsistantReferees():void {
    this.adminService.getRefereesByType("assistant_referee").subscribe(
      (response : Referee[]) => {
        this.asistantReferees=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getFourthOfficiels():void {
    this.adminService.getRefereesByType("fourth_official").subscribe(
      (response : Referee[]) => {
        this.fourthOfficiels=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public onOpenModal(game: Game , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addGameModal');
    }
    if(mode === 'edit') {
      this.editGame = game;
      button.setAttribute('data-target','#updateGameModal');
    }
    if(mode === 'delete') {
      this.deleteGame=game;
      button.setAttribute('data-target','#deleteGameModal');
    }
    container.appendChild(button);
    button.click();
  }
  public onAddGame(addForm:NgForm) : void {
    const winners=this.teams.length;
    if( (this.tourId==1 && winners==this.tour.numberTeamMax) || (this.tourId==2 && winners==this.tour.numberTeamMax) || (this.tourId==3 && winners==this.tour.numberTeamMax) ) {
    document.getElementById('add-game-form').click(); // to close form after adding Game
    let game:Game ;
    game=addForm.value;
    game.score="0-0";
    game.tour=this.tour;
    if(game.homeTeam.id!=game.awayTeam.id) {
      this.adminService.createGameWithEmbededTour(game).subscribe(
        (response:Game) => {
          this.getGamesOfCurrentTour();
          this.getTeams();
          this.getStadiums();
          this.getReferees();
          this.getAsistantReferees();
          this.getFourthOfficiels();
          addForm.reset(); //for resetting the fields of the form to blank sapces 
        },
        (error:HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
        
      );
      }
      else {
        alert('Pick two different teams!');
      }
   }
   else {
     alert('Verifie your teams or there\'s not enough teams to create Tour');
   }
  }
  public onDeleteGame(gameId:number) : void {
    this.adminService.deleteGame(gameId).subscribe(
      (response:void) => {
        this.getGamesOfCurrentTour();
        this.getTeams();
        this.getStadiums();
        this.getReferees();
        this.getAsistantReferees();
        this.getFourthOfficiels();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateGame(game:Game) : void {
    this.adminService.updateGame(game.id,game).subscribe(
      (response:Game) => {
        this.getGamesOfCurrentTour();
        this.getTeams();
        this.getStadiums();
        this.getReferees();
        this.getAsistantReferees();
        this.getFourthOfficiels();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
