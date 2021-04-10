import { Subject } from 'rxjs';
import { SpectatorService } from 'src/app/services/spectator.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Spectator } from 'src/app/models/spectator';

@Component({
  selector: 'app-show-spectator',
  templateUrl: './show-spectator.component.html',
  styleUrls: ['./show-spectator.component.css']
})
export class ShowSpectatorComponent implements OnInit {

  public spectator!: Spectator;// =  new Spectator("firstName","lastName","email","",1,11399688,new Date(),"sex" );
  public spectatorId!: number;
 constructor(
       private spectService: SpectatorService,
       private activatedRoute: ActivatedRoute,
       private spectatorService: SpectatorService
       ) {
  this.spectatorId = this.activatedRoute.snapshot.params['id'];
  }

  public textToShow: string="";
  public showModal: boolean=false;
  public redirectURL: string="";
  public isForDelete: boolean =true;

 ngOnInit() {
   this.spectService.spectatorSubject.subscribe(
     (s:Spectator)=>{
       this.spectator = s;
     },(error)=>{
       console.log(error);
  });
   
   this.spectService.getSpectatorById(this.spectatorId);
 }


 public onDeletionConfirmed(confirmation:boolean) {
  if(confirmation) {
    this.spectatorService.deleteSpectator(this.spectatorId).then((data)=>{
      if(data) {
        this.textToShow="spectateur supprimé avec success";
        setTimeout(()=>{
         this.showModal = false;
        },3000);
      }
  },(error)=>{
    console.log("ERROR FROM COMPONENT"+error);
    this.textToShow="une erreur est survenue, veuillez ressayer";
   });
 }else{
  this.textToShow = "";
  this.showModal = false;
 }
}

public onDelete(spectatorId:number | undefined) {
   if(spectatorId) {
    this.textToShow = "voulez-vous vraiment supprimer le spectateur avec l 'id  "+spectatorId;
    this.showModal = true;
    this.spectatorId = spectatorId
   }
}


}
