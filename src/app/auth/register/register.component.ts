import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {matchValidator} from "./password-validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{
  registerForm!: FormGroup
  errorMessage : string = '';
  successMessage : string = '';
  constructor(private auth : AuthService) { }
  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required, matchValidator('password')])
    })

    this.auth.registrationError
      .subscribe((error : string) => {
        this.errorMessage = error;
      });

    this.auth.registrationSuccess
      .subscribe((success : string) => {
        this.successMessage = success;
      });
  }

  registerUser(){
    let newUser = this.registerForm.value;
    this.auth.register({
      username: newUser.username,
      password: btoa(newUser.password),
      email: newUser.email,
      name: newUser.name
    });
  }

  get name(){
    return this.registerForm.get('name')
  }
  get username(){
    return this.registerForm.get('username')
  }
  get email(){
    return this.registerForm.get('email')
  }
  get password(){
    return this.registerForm.get('password')
  }
  get confirm_password(){
    return this.registerForm.get('confirm_password')
  }

  ngOnDestroy(): void {

  }

}
