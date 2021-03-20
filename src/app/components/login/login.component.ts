import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginUser } from 'src/app/models/loginUser';
import { AuthService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public loginForm!: FormGroup;
  public authSubscription!: Subscription;
  public httpMessages="";
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}
 

  ngOnInit() {
    this.initLoginForm();
    this.authSubscription = this.authService.authSubject.subscribe(
        isAuthentified => {
          if (isAuthentified === true) {
              this.router.navigate(['dashboard1']);
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

    this.authService.attemptAuth(user);
  }


  styleDecision() {
    return 'text-center text-danger';
  }

}
