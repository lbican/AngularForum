import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {PostsComponent} from "../posts/posts.component";
import {RegisterComponent} from "../auth/register/register.component";
import {AuthModule} from "../auth/auth.module";

const routes : Route[] = [
  {path: '', component:PostsComponent},
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
