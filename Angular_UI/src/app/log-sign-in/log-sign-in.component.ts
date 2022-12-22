import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { AuthenticationService } from '../services/authenticationService';

@Component({
  selector: 'app-log-sign-in',
  templateUrl: './log-sign-in.component.html',
  styleUrls: ['./log-sign-in.component.css']
})
export class LogSignInComponent implements OnInit {


  newUserName: any;
  newUserPassword: any;
  newUserEmail: any;

  existingUserPassword: any;
  existingUserName: any;

  registerFormSubmitted: boolean = false;
  logInFormSubmitted: boolean = false;

  loginSuccessful: boolean = false;

  constructor(private authentificationService: AuthenticationService,
    private alertService: AlertService) { }

  logInForm = new FormGroup
    (
      {
        logInPassword: new FormControl("",
          [
            Validators.required,
          ]),

        logInUserName: new FormControl(null,
          [
            Validators.required,
          ]),
      }
    )

  registerForm = new FormGroup
    (
      {
        registerPassword: new FormControl("",
          [
            Validators.required,
          ]),

        registerEmail: new FormControl(null,
          [
            Validators.required,
          ]),

        registerUserName: new FormControl(null,
          [
            Validators.required,
          ]),
      }
    )

  ngOnInit(): void {
  
  }

  test() {
    this.newUserName = null;
    this.newUserPassword = null;
    this.newUserEmail = null;
  }
  
  get registerPassword() {
    return this.registerForm.get('registerPassword');
  }

  get registerEmail() {
    return this.registerForm.get('registerEmail');
  }

  get registerUserName() {
    return this.registerForm.get('registerUserName');
  }

  get logInPassword() {
    return this.logInForm.get('logInPassword');
  }

  get logInUserName() {
    return this.logInForm.get('logInUserName');
  }

  logIn() {
    this.logInFormSubmitted = true;

    let existingUser = {
      username: this.existingUserName,
      password: this.existingUserPassword
    }

    const loginObserver = {
      next: (x: any) => {
        this.alertService.success('Welcome back ' + x.username);
        this.loginSuccessful = true;
      },
      error: (err: any) => {
        this.alertService.danger('Unable to Login');
      },
    };

    this.authentificationService.login(existingUser).subscribe(loginObserver);
  }
  
  okClick(){
    this.loginSuccessful = false;
  }

  registerUser() {

    this.registerFormSubmitted = true;
    let newUser = {
      userName: this.newUserName,
      password: this.newUserPassword,
      email: this.newUserEmail
    }
    console.log(newUser);
    const registerObserver =
    {
      next: (x: any) => {

        this.alertService.success("Registraion successfull");
        this.newUserName = "";
        this.newUserPassword = "";
        this.newUserEmail = "";
      },
      error: (err: any) => {

        this.alertService.danger("Unable to register user");
      }

    }
  
    this.authentificationService.registerUser(newUser).subscribe(registerObserver)
  }

}
