import { AppGlobals } from './../../globals/app-globals';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginUser } from 'src/app/models/oussama/loginUser';
import { AuthService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public loginForm!: FormGroup;
  public authSubscription!: Subscription;
  public httpMessages="";
  private goto: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private globals: AppGlobals,
    private route: ActivatedRoute,
    private tss: TokenStorageService
  ) {
  
  }
 

  ngOnInit() {
    this.initLoginForm();
    this.route.queryParams.pipe(
      filter(params => params.goto)
    ).subscribe((params) => {
      this.goto = params['goto'] || undefined;
    });

    this.authSubscription = this.authService.authSubject.subscribe(
        isAuthentified => {
          if (isAuthentified === true) {
            if(!this.goto) {
               if(this.globals.isAdmin()) {
                console.log("AD")
                this.router.navigate(["admin"]);
               }else{
                console.log("!AD")
                this.router.navigate(['spectator-dashboard']);
               }
            }else{
              if(this.globals.isAdmin()){
                this.tss.logItOut();
                this.httpMessages ="veuillez se connecter avec un compte spectateur s'il vous plait";
              }else{
                this.router.navigateByUrl("/"+this.goto);
              }
            }
          } else {
              this.httpMessages = "email ou mot de passe incorrectes, ressayer!";
          }
        }
    );
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]]
    });
  }

  onSubmitLoginForm() {
    
    const formValues = this.loginForm.value;
    const email = formValues['email'];
    const password = formValues['password'];
    const user = new LoginUser(email, password);

    this.authService.attemptAuth(user,this.goto ? true: false);
  }


  styleDecision() {
    return 'text-center text-danger';
  }

}
