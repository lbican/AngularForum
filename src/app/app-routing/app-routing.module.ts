import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {PostsComponent} from "../posts/posts.component";
import {RegisterComponent} from "../auth/register/register.component";
import {AuthModule} from "../auth/auth.module";
import {ProfileComponent} from "../profile/profile.component";

const routes : Route[] = [
  {path: '', component:PostsComponent},
  {path: 'user/:uid', component:ProfileComponent},
  {path:'login',loadChildren: () => AuthModule},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
