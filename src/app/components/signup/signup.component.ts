import { ModalComponent } from './../../ui-extras/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;
  userServiceSubscription!: Subscription;
  public diffPwd=false;

  public users!: UserModel[];
  public httpErrors: any;

  public modalText="votre compte à ete crée avec succes, vous allez etre redirigé à la page login";
  public showModal=false;
  public redirectURL="/login";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initSignUpForm();
  }

 
  initSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ["", { validators: [Validators.minLength(8)] }],
      checkPassword: [""],
      cin: ["",{ validators: [Validators.pattern('^[0-9]{8}$')]}],
      sex: ["M",Validators.required],
      birthDate: ["",Validators.required]
    });
  }

  createUserFromForm(): UserModel {
    const values = this.signUpForm.value;
    const firstName = values["firstName"];
    const lastName = values["lastName"];
    const email = values["email"];
    const password = values["password"];
    const checkPassword = values["checkPassword"];
    const cin = values["cin"];
    const sex = values["sex"];
    const birthDate = values['birthDate'];


    return new UserModel(firstName , lastName, email,undefined,undefined,cin,birthDate,sex,password );
  }

  public checkPwd() {
    this.diffPwd = (this.signUpForm.value["password"] != this.signUpForm.value["checkPassword"]);
  }

  onSubmitSignUpForm() {
   const user = this.createUserFromForm();
   console.log(user)
  
    this.userService.addUser(user).then(
      (data: any) => {
         if(data==true) {
           this.showModal = true;
         }else{
             //here show error message next to the form data input
         }
        this.httpErrors = data;
      },
      (errors: HttpErrorResponse) => {
        this.httpErrors = errors.error;
      }
    );
  }

  styleDecision() {
    if (this.httpErrors["type"] === "ERROR") {
      return "text-center text-danger";
    } else {
      return "text-center text-success";
    }
  }

}
