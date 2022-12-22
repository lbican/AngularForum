import {Injectable} from '@angular/core';
import {User} from "./user.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {
  private user : User | null = null;
  errorEmitter : Subject<string> = new Subject<string>();
  registrationError : Subject<string> = new Subject<string>();

  authChange : Subject<boolean> = new Subject<boolean>();
  registrationSuccess : Subject<string> = new Subject<string>();
  constructor(private http : HttpClient, private router : Router) { }

  login(credentials : {username : string, password: string}){

    this.http.get(environment.usersDatabase + '.json')
      .subscribe((res : any) => {
        let users = [];
        for (let key in res){
          console.log(res[key])
          users.push({...res[key], id:key});
        }

        const user = users.find(u => u.username==credentials.username && u.password==btoa(credentials.password));
        if (user) {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.authChange.next(true);
          this.router.navigate(['/']).then(() => Promise.resolve());
        } else {
          this.errorEmitter.next('Wrong credentials');
        }
    });
  }

  register(user: any){
    this.http.post(environment.usersDatabase + '.json',user)
      .subscribe((res => {
        console.log(res);
        if(res){
          this.registrationSuccess.next('User successfully registered!')
        } else{
          this.registrationError.next('Error registering user. Please try again later.')
        }
      }))
  }

  logout(){
    this.user=null;
    localStorage.removeItem('user');
    this.authChange.next(false);
    this.router.navigate(['/login']).then(() => Promise.resolve());
  }

  getUser():User{
    let u = localStorage.getItem('user');
    if (!this.user && u) this.user=JSON.parse(u);
    return {...this.user} as User;
  }

  isAuthenticated(){
    return this.user!=null;
  }
}
