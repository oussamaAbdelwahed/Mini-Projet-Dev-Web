import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tour } from 'src/app/models/tour';
import { AdminService } from 'src/app/services/admin.service';
declare var $;
@Component({
  selector: 'app-gestion-tours',
  templateUrl: './gestion-tours.component.html',
  styleUrls: ['./gestion-tours.component.css']
})
export class GestionToursComponent implements OnInit, AfterViewInit {
  @ViewChild('dataTable',{static:false}) table ;
  dataTable : any ;

  public tours: Tour[];
  public editTour: Tour ;
  public deleteTour : Tour ;
  constructor(private adminService : AdminService) { }

  ngOnInit(): void {
    this.getTours();
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
  }, 250);
  }

  public getTours():void {
    this.adminService.getAllTours().subscribe(
      (response : Tour[]) => {
        this.tours=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(tour: Tour , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addTourModal');
    }
    if(mode === 'edit') {
      this.editTour = tour;
      button.setAttribute('data-target','#updateTourModal');
    }
    if(mode === 'delete') {
      this.deleteTour=tour;
      button.setAttribute('data-target','#deleteTourModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onAddTour(addForm:NgForm) : void {
    document.getElementById('add-tour-form').click(); // to close form after adding Tour
    this.adminService.createTour(addForm.value).subscribe(
      (response:Tour) => {
        this.getTours();
        addForm.reset(); //for resetting the fields of the form to blank sapces 
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateTour(tour:Tour) : void {
    this.adminService.updateTour(tour.id,tour).subscribe(
      (response:Tour) => {
        this.getTours();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteTour(tourId:number) : void {
    this.adminService.deleteTour(tourId).subscribe(
      (response:void) => {
        this.getTours();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
