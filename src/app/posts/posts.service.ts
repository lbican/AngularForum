import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../shared/post.model";
import {BehaviorSubject} from "rxjs";
import {DataService} from "../shared/data.service";
import {User} from "../shared/user.model";

interface UserResponse{
  name: string
}
@Injectable({
  providedIn: 'root'
})
export class PostsService{
  posts : Post[] = [];
  PostSubject : BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  constructor(private http:HttpClient, private dataService:DataService) {
    this.init()
  }

  init(){
    this.dataService.getPosts()
      .subscribe(res => {
        this.posts=res;
        this.PostSubject.next(this.posts);
      })
  }

  getPosts(){
    return this.PostSubject;
  }


  addPost(post:Post){
    this.dataService.addPost(post)
      .subscribe((() => {
        this.posts.push({...post});
        this.PostSubject.next(this.posts);
      }));
  }

  deletePost(id:number){
    this.dataService.deletePost(id)
      .subscribe((() => {
        this.posts=this.posts.filter(c => c.id!=id);
        this.PostSubject.next(this.posts);
      }));
  }

  editPost(post:Post){
    this.dataService.editPost(post)
      .subscribe((res => {
        console.log(res);
        this.posts[this.posts.findIndex(c => c.id==post.id)]=post;
      }),error => {
        console.log(error);
      });
  }

}
