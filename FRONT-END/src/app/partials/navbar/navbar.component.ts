import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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
