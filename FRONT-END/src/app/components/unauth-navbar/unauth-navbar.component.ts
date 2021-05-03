import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-unauth-navbar',
  templateUrl: './unauth-navbar.component.html',
  styleUrls: ['./unauth-navbar.component.css']
})
export class UnauthNavbarComponent implements OnInit {

  public activatedLink: string="";
  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private tokenServ: TokenStorageService
    ) { }

  public onClickLink(event: any) {
    event.preventDefault();
    if(!this.tokenServ.isLoggedIn()) {
      this.router.navigate(["login"],{ queryParams: { goto: "spectator-dashboard/buy-ticket" } });
    }else{
      this.router.navigate(["spectator-dashboard","buy-ticket"]);
    }
    
  }


  ngOnInit(): void {
    this.activatedLink = this.activatedRoute.snapshot.url.join('');
  }

}
