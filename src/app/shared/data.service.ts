import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Post} from "./post.model";
import {environment} from "../../environments/environment";
import {first} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService{

  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get(environment.postsDatabase + '.json')
      .pipe(map((res:any) => {
        const posts=[];
        for (let key in res){
          posts.push({...res[key], id:key});
        }
        return posts;
      }));
  }

  getUsers(){
    return this.http.get(environment.usersDatabase + '.json')
      .pipe(map((res:any) => {
        const users=[];
        for (let key in res){
          users.push({...res[key], id:key});
        }
        return users;
      }));
  }

  addPost(post:Post){
    return this.http.post(environment.postsDatabase + '.json',post);
  }

  deletePost(id:string){
    return this.http.delete(`${environment.postsDatabase}/${id}.json`)
  }

  editPost(post:Post){
    return this.http.patch(`${environment.postsDatabase}/${post.id}/.json`,post)
  }
}
