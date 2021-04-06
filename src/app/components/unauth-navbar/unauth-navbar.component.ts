import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauth-navbar',
  templateUrl: './unauth-navbar.component.html',
  styleUrls: ['./unauth-navbar.component.css']
})
export class UnauthNavbarComponent implements OnInit {

  public activatedLink: string="";
  constructor(private router:Router,private activatedRoute: ActivatedRoute) { }

  public onClickLink(event: any) {
    event.preventDefault();
    this.router.navigate([event.currentTarget.getAttribute("href")]);
  }


  ngOnInit(): void {
    this.activatedLink = this.activatedRoute.snapshot.url.join('');
  }

}
