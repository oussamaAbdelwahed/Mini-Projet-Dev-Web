import { Router } from '@angular/router';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges ,EventEmitter } from '@angular/core';

//import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges  {

  @Input() textToShow? : string;
  @Input() show?: boolean;
  @Input() redirectURL?: string;
  @Input() isForDelete?: boolean;

  @Output() confirmedDeletion = new EventEmitter<boolean>();

  public display = "none";
  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges) {
   console.log(changes);
   if(this.show == true) {
    this.display = "block";
   }else{
    this.display = "none";
   }
  }

  public onModalOkClicked(){
     if(this.isForDelete) {
       this.confirmedDeletion.emit(true);
       //
     }else{
      this.display = "none";
      this.router.navigate([this.redirectURL]);
    }
  }

 closeModal() {
  this.display = "none";
  this.confirmedDeletion.emit(false);
 }

}
