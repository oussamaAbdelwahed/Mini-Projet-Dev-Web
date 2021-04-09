import { AppGlobals } from '../../../globals/app-globals';
import { SpectatorService } from 'src/app/services/spectator.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Spectator } from 'src/app/models/spectator';



@Component({
  selector: 'app-update-spectator',
  templateUrl: './update-spectator.component.html',
  styleUrls: ['./update-spectator.component.css']
})
export class UpdateSpectatorComponent implements OnInit {
   private spectatorId!:number;
   public spectator!: Spectator;

  constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private spectService: SpectatorService,
        private globals: AppGlobals
        ) 
         {
         this.spectatorId = +this.activatedRoute.snapshot.params.id;
         console.log("ID = "+this.spectatorId);
        }

   editSpectForm!: FormGroup;
   spectatorServiceSubscription!: Subscription;

   public httpErrors: any = {};
 
   public modalText="les informations du spectatuer ont ete mis à jour";
   public showModal=false;
   public redirectURL="";

   ngOnInit() {
     this.initSignUpForm();

     this.spectatorServiceSubscription = this.spectService.spectatorSubject.subscribe((spec: Spectator)=>{
       this.spectator = spec;
       this.editSpectForm.patchValue({
        firstName: this.spectator.firstname,
        lastName: this.spectator.lastname,
        email:this.spectator.email,
        cin:this.spectator.cin,
        sex:this.spectator.sex =='MAL'?"M":"F",
        birthDate: this.globals.formatDate(this.spectator.dateNaiss ?this.spectator.dateNaiss :new  Date())
     });
     },(error)=>{
       console.log(error);
     });
     this.spectService.getSpectatorById(this.spectatorId);
   }

    
 
  
   initSignUpForm() {
     this.editSpectForm = this.formBuilder.group({
       firstName: ["", Validators.required],
       lastName: ["", Validators.required],
       email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
       cin: ["",{ validators: [Validators.pattern('^[0-9]{8}$')]}],
       sex: ["M",Validators.required],
       birthDate: [""]
     });
   }
 
  
 
 
   onSubmitForm() {
    const formValues = this.editSpectForm.value;
    const s = new Spectator(formValues["firstName"],formValues["lastName"],formValues["email"],"",this.spectatorId,formValues["cin"],formValues["birthDate"],formValues["sex"] == 'MAL' ? "MAL" : "FEM")
    if(formValues["birthDate"]=="-NaN-undefined" || !formValues["birthDate"]) {
       s.setBirthDate(this.spectator.dateNaiss)
    }

     this.spectService.updateSpectator(s).then((d:any)=>{
       if(d.hasOwnProperty("id")) {
         this.httpErrors.message="informations mises à jour avec success";
       }else{
         this.httpErrors.type="ERROR";
         this.httpErrors.message="un problème est survenu, l' email ou le cin est déja utilisé";
       }
     },(error)=>{
      this.httpErrors.type="ERROR";
      this.httpErrors.message="un problème est survenu, veuillez ressayer";
     });
   
   }
 
   styleDecision() {
     if (this.httpErrors["type"] === "ERROR") {
       return "text-center text-danger";
     } else {
       return "text-center text-success";
     }
   }

}
