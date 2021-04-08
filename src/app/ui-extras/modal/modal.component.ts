import { Router } from '@angular/router';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  public display = "none";
  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges) {
   if(changes["show"].currentValue == true) {
    this.display = "block";
   }
  }

  public onModalOkClicked(){
      this.display = "none";
      this.router.navigate([this.redirectURL]);
  }

}
