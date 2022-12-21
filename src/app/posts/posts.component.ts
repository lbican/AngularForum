import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {User} from "../shared/user.model";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit(): void {
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['/login']).then(() => Promise.resolve());
    }
  }

  logout(){
    this.auth.logout();
  }

  getUser(): User{
    return this.auth.getUser();
  }


}
