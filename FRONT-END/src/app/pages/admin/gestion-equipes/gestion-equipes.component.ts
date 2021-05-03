import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Team } from 'src/app/models/team';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-gestion-equipes',
  templateUrl: './gestion-equipes.component.html',
  styleUrls: ['./gestion-equipes.component.css']
})
export class GestionEquipesComponent implements OnInit {
  public teams: Team[];
  public editTeam: Team ;
  public deleteTeam : Team ; 
  constructor(private adminService: AdminService ) { }

  ngOnInit() {
    this.getTeams();
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

  public onOpenModal(team: Team , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addTeamModal');
    }
    if(mode === 'edit') {
      this.editTeam = team;
      button.setAttribute('data-target','#updateTeamModal');
    }
    if(mode === 'delete') {
      this.deleteTeam=team;
      button.setAttribute('data-target','#deleteTeamModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onAddTeam(addForm:NgForm) : void {
    document.getElementById('add-team-form').click(); // to close form after adding Employee
    this.adminService.createTeam(addForm.value).subscribe(
      (response:Team) => {
        this.getTeams();
        addForm.reset(); //for resetting the fields of the form to blank sapces 
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateTeam(team:Team) : void {
    this.adminService.updateTeam(team.id,team).subscribe(
      (response:Team) => {
        this.getTeams();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteTeam(teamId:number) : void {
    this.adminService.deleteTeam(teamId).subscribe(
      (response:void) => {
        this.getTeams();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
