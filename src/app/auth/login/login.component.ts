import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  errorMessage : string = '';
  loginForm! : FormGroup;

  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit() {
    if(this.auth.isAuthenticated()){
      this.router.navigate(['/']).then(() => Promise.resolve());
    }

    this.loginForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required]),
      'password' : new FormControl(null, [Validators.required])
    });

    this.auth.errorEmitter
      .subscribe((error : string) => {
        this.errorMessage = error;
      });

  }

  onLogin(){
    this.auth.login(this.loginForm.value);
  }
}
