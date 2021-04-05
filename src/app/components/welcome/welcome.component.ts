import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router) { }
  public onSignUpButtonClicked() {
      this.router.navigate(['/signup'])
  }

  public onLoginButtonClicked() {
    this.router.navigate(['/login'])
  }

  public onBuyTicketButtonClicked() {
    this.router.navigate(['/buy-ticket'])
  }
  ngOnInit(): void {
  }

}
