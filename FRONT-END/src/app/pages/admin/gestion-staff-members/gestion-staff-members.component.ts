import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Staff } from 'src/app/models/staff';
import { Team } from 'src/app/models/team';
import { AdminService } from 'src/app/services/admin.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-gestion-staff-members',
  templateUrl: './gestion-staff-members.component.html',
  styleUrls: ['./gestion-staff-members.component.css']
})
export class GestionStaffMembersComponent implements OnInit, AfterViewInit {
  @ViewChild('dataTable',{static:false}) table ;
  dataTable : any ;
  public roleStaffs : string[] = ['Assistant_Manager',
    'Goalkeeping_Coach',
    'Chief_Analyst',
    'Fitness_Coach',
    'Conditioning_Coach',
    'Chef_Nutritionist',
    'Physiotherapist',
    'Masseur',
    'Scout',
    'Kit_Manager',
    'YouthTeamCoach'];
  public teams: Team[];
  public staffs: Staff[];
  public editStaff: Staff ;
  public deleteStaff : Staff ;
  constructor(private router : Router,
    private adminService : AdminService) { }
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

    ngOnInit(): void {
      this.getStaffs();
      this.getTeams();
    }

    public getStaffs():void {
      this.adminService.getAllStaffMembers().subscribe(
        (response : Staff[]) => {
          this.staffs=response;
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
    public onOpenModal(staff: Staff , mode : string) : void {
      const container = document.getElementById('main-container');
      
      const button = document.createElement('button');
      button.type= 'button' ;
      button.style.display = 'none' ;
      button.setAttribute('data-toggle' , 'modal');
      if(mode === 'add') {
        button.setAttribute('data-target','#addStaffModal');
      }
      if(mode === 'edit') {
        this.editStaff = staff;
        button.setAttribute('data-target','#updateStaffModal');
      }
      if(mode ==="editTeam") {
        this.editStaff = staff;
        button.setAttribute('data-target','#updateStaffTeamModal');
      }
      if(mode === 'delete') {
        this.deleteStaff=staff;
        button.setAttribute('data-target','#deleteStaffModal');
      }
      container.appendChild(button);
      button.click();
    }

    public onAddStaff(addForm:NgForm) : void {
      document.getElementById('add-staff-form').click(); // to close form after adding Employee
      this.adminService.createStaffMember(addForm.value).subscribe(
        (response:Staff) => {
          this.getStaffs();
          addForm.reset(); //for resetting the fields of the form to blank sapces 
        },
        (error:HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );
    }
    public onUpdateStaff(staff:Staff) : void {
      this.adminService.updateStaffMember(staff.id,staff).subscribe(
        (response:Staff) => {
          this.getStaffs();
        },
        (error:HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    public onUpdateStaffTeam(staff:Staff): void {
      this.adminService.updateStaffMemberTeam(staff.id,staff).subscribe(
        (response:Staff) => {
          this.getStaffs();
        },
        (error:HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    public onDeleteStaff(staffId:number) : void {
      this.adminService.deleteStaffMember(staffId).subscribe(
        (response:void) => {
          this.getStaffs();
        },
        (error:HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
}
