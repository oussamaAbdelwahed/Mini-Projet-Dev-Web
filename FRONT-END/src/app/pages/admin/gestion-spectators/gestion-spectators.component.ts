import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Spectator } from 'src/app/models/spectator';
import { AdminService } from 'src/app/services/admin.service';
declare var $;
@Component({
  selector: 'app-gestion-spectators',
  templateUrl: './gestion-spectators.component.html',
  styleUrls: ['./gestion-spectators.component.css']
})
export class GestionSpectatorsComponent implements OnInit, AfterViewInit {
  @ViewChild('dataTable',{static:false}) table ;
  dataTable : any ;
  public spectators: Spectator[];
  public editSpectator: Spectator ;
  public deleteSpectator : Spectator ;
  constructor(private adminService : AdminService) { }

  ngOnInit(): void {
    this.getSpectators();
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
  public getSpectators():void {
    this.adminService.getAllSpectators().subscribe(
      (response : Spectator[]) => {
        this.spectators=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(spectator: Spectator , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addSpectatorModal');
    }
    if(mode === 'edit') {
      this.editSpectator = spectator;
      button.setAttribute('data-target','#updateSpectatorModal');
    }
    if(mode === 'delete') {
      this.deleteSpectator=spectator;
      button.setAttribute('data-target','#deleteSpectatorModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onAddSpectator(addForm:NgForm) : void {
    document.getElementById('add-spectator-form').click(); // to close form after adding Spectator
    this.adminService.createSpectator(addForm.value).subscribe(
      (response:Spectator) => {
        this.getSpectators();
        addForm.reset(); //for resetting the fields of the form to blank sapces 
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateSpectator(spectator:Spectator) : void {
    this.adminService.updateSpectator(spectator.id,spectator).subscribe(
      (response:Spectator) => {
        this.getSpectators();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteSpectator(spectatorId:number) : void {
    this.adminService.deleteSpectator(spectatorId).subscribe(
      (response:void) => {
        this.getSpectators();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
