import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {AuthService} from "./shared/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
