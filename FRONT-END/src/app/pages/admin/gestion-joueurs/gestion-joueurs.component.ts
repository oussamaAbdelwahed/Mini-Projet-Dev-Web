import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from 'src/app/models/player';
import { Team } from 'src/app/models/team';
import { AdminService } from 'src/app/services/admin.service';
declare var $;
@Component({
  selector: 'app-gestion-joueurs',
  templateUrl: './gestion-joueurs.component.html',
  styleUrls: ['./gestion-joueurs.component.css']
})
export class GestionJoueursComponent implements OnInit, AfterViewInit {
  @ViewChild('dataTable',{static:false}) table ;
  dataTable : any ;
  public playerPositions : string[] = ['Goalkeeper',
    'Centre_back',
    'Sweeper',
    'Full_back',
    'Wing_back',
    'Centre_midfield',
    'Defensive_midfield',
    'Attacking_midfield',
    'Wide_midfield',
    'Striker',
    'Centre_forward',
    'Winger'];
  public teams: Team[];
  public players: Player[];
  public editPlayer: Player ;
  public deletePlayer : Player ; 
  constructor(private router : Router,
              private adminService : AdminService) {                 
  }

  ngOnInit(): void {
    this.getPlayers();
    this.getTeams();
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
  }, 600);
  }

  public getPlayers():void {
    this.adminService.getAllPlayers().subscribe(
      (response : Player[]) => {
        this.players=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getTeams():void {
    this.adminService.getAllTeams().subscribe(
      (response : Team[]) => {
        this.teams=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(player: Player , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addPlayerModal');
    }
    if(mode === 'edit') {
      this.editPlayer = player;
      button.setAttribute('data-target','#updatePlayerModal');
    }
    if(mode==='editTeam') {
      this.editPlayer = player;
      button.setAttribute('data-target','#updatePlayerTeamModal');
    }
    if(mode === 'delete') {
      this.deletePlayer=player;
      button.setAttribute('data-target','#deletePlayerModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onAddPlayer(addForm:NgForm) : void {
    document.getElementById('add-player-form').click(); // to close form after adding Employee
    this.adminService.createPlayer(addForm.value).subscribe(
      (response:Player) => {
        this.getPlayers();
        addForm.reset(); //for resetting the fields of the form to blank sapces 
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdatePlayer(player:Player) : void {
    this.adminService.updatePlayer(player.id,player).subscribe(
      (response:Player) => {
        this.getPlayers();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onUpdatePlayerTeam(player:Player) : void {
    this.adminService.updatePlayerTeam(player.id,player).subscribe(
      (response:Player) => {
        this.getPlayers();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeletePlayer(playerId:number) : void {
    this.adminService.deletePlayer(playerId).subscribe(
      (response:void) => {
        this.getPlayers();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
}
