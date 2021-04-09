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
 constructor(private spectService: SpectatorService, private activatedRoute: ActivatedRoute) {
  this.spectatorId = this.activatedRoute.snapshot.params['id'];
  }

 ngOnInit() {
   this.spectService.spectatorSubject.subscribe(
     (s:Spectator)=>{
       this.spectator = s;
     },(error)=>{
       console.log(error);
  });
   
   this.spectService.getSpectatorById(this.spectatorId);
 }

 public setIdToSupposeDelete(id: number | undefined) {

 }

}
