import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Stadium } from 'src/app/models/stadium';
import { AdminService } from 'src/app/services/admin.service';
declare var $;
@Component({
  selector: 'app-gestion-stadium',
  templateUrl: './gestion-stadium.component.html',
  styleUrls: ['./gestion-stadium.component.css']
})
export class GestionStadiumComponent implements OnInit, AfterViewInit {
  @ViewChild('dataTable',{static:false}) table ;
  dataTable : any ;
  public stadiums: Stadium[];
  public editStadium: Stadium ;
  public deleteStadium : Stadium ;
  constructor(private router : Router,
    private adminService : AdminService) { }

  ngOnInit(): void {
    this.getStadiums();
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
  public onOpenModal(stadium: Stadium , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addStadiumModal');
    }
    if(mode === 'edit') {
      this.editStadium = stadium;
      button.setAttribute('data-target','#updateStadiumModal');
    }
    if(mode === 'delete') {
      this.deleteStadium=stadium;
      button.setAttribute('data-target','#deleteStadiumModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onAddStadium(addForm:NgForm) : void {
    document.getElementById('add-stadium-form').click(); // to close form after adding Stadium
    this.adminService.createStadium(addForm.value).subscribe(
      (response:Stadium) => {
        this.getStadiums();
        addForm.reset(); //for resetting the fields of the form to blank sapces 
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateStadium(stadium:Stadium) : void {
    this.adminService.updateStadium(stadium.id,stadium).subscribe(
      (response:Stadium) => {
        this.getStadiums();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteStadium(stadiumId:number) : void {
    this.adminService.deleteStadium(stadiumId).subscribe(
      (response:void) => {
        this.getStadiums();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
