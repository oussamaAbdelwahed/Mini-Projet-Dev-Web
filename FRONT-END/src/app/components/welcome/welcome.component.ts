import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private router: Router,
    private tokenServ: TokenStorageService
    ) { }
  public onSignUpButtonClicked() {
      this.router.navigate(['/signup'])
  }

  public onLoginButtonClicked() {
    this.router.navigate(['/login'])
  }

  public onBuyTicketButtonClicked() {
    if(!this.tokenServ.isLoggedIn()) {
      this.router.navigate(["login"],{ queryParams: { goto: "spectator-dashboard/buy-ticket" } });
    }else{
      this.router.navigate(["spectator-dashboard","buy-ticket"]);
    }
  }
  ngOnInit(): void {
  }

}
