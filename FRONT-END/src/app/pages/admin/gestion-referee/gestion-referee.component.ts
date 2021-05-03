import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Referee } from 'src/app/models/referee';
import { AdminService } from 'src/app/services/admin.service';
declare var $;
@Component({
  selector: 'app-gestion-referee',
  templateUrl: './gestion-referee.component.html',
  styleUrls: ['./gestion-referee.component.css']
})
export class GestionRefereeComponent implements OnInit, AfterViewInit {
  @ViewChild('dataTable',{static:false}) table ;
  dataTable : any ;
  public TypeReferees : string[] = [
    'referee',
	'assistant_referee',
	'fourth_official'
  ];
  public referees: Referee[];
  public editReferee: Referee ;
  public deleteReferee : Referee ;
  constructor(private router : Router,
    private adminService : AdminService) { }
  
  ngOnInit(): void {
    this.getReferees();
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
  public getReferees():void {
    this.adminService.getAllReferees().subscribe(
      (response : Referee[]) => {
        this.referees=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(referee: Referee , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addRefereeModal');
    }
    if(mode === 'edit') {
      this.editReferee = referee;
      button.setAttribute('data-target','#updateRefereeModal');
    }
    if(mode === 'delete') {
      this.deleteReferee=referee;
      button.setAttribute('data-target','#deleteRefereeModal');
    }
    container.appendChild(button);
    button.click();
  }
  public onAddReferee(addForm:NgForm) : void {
    document.getElementById('add-referee-form').click(); // to close form after adding Referee
    this.adminService.createReferee(addForm.value).subscribe(
      (response:Referee) => {
       this.getReferees();
        addForm.reset(); //for resetting the fields of the form to blank sapces 
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public onUpdateReferee(referee:Referee) : void {
    this.adminService.updateReferee(referee.id,referee).subscribe(
      (response:Referee) => {
        this.getReferees();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteReferee(refereeId:number) : void {
    this.adminService.deleteReferee(refereeId).subscribe(
      (response:void) => {
        this.getReferees();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
