import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Post} from "./post.model";
import {environment} from "../../environments/environment";

export interface NewPost{
  userId: number,
  comment: string,
}
@Injectable({
  providedIn: 'root'
})
export class DataService{

  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get(environment.postsDatabase)
      .pipe(map((res:any) => {
        return [...res];
      }));
  }

  getUsers(){
    return this.http.get(environment.usersDatabase)
      .pipe(map((res:any) => {
        const users=[];
        for (let key in res){
          users.push({...res[key], id:key});
        }
        return users;
      }));
  }

  getUser(id: number){
    console.log('GETTING USER');
    return this.http.get(`${environment.usersDatabase}/${id}`).pipe(map((res:any) => {
      return {...res}
    }))
  }

  addPost(post:NewPost){
    return this.http.post(environment.postsDatabase, post);
  }

  getPost(id: number){
    return this.http.get(`${environment.postsDatabase}/${id}`);
  }

  deletePost(id:number){
    return this.http.delete(`${environment.postsDatabase}/${id}`)
  }

  editPost(post:Post){
    return this.http.patch(`${environment.postsDatabase}/${post.id}`, post)
  }
}
