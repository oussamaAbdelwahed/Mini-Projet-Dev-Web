import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-spectator-navbar',
  templateUrl: './spectator-navbar.component.html',
  styleUrls: ['./spectator-navbar.component.css']
})
export class SpectatorNavbarComponent implements OnInit {

  constructor(
    private router:Router,
    private tokenStorageService: TokenStorageService 
    ) { }

  ngOnInit(): void {
  }

  public logout() {
     this.tokenStorageService.logItOut();
     this.router.navigate(["login"]);
  }


}
