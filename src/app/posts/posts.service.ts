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
  users: User[] = [];
  PostSubject : BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  UserSubject : BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  constructor(private http:HttpClient, private dataService:DataService) {
    this.init()
  }

  init(){
    this.dataService.getPosts()
      .subscribe(res => {
        this.posts=res;
        this.PostSubject.next(this.posts);
      })

    this.dataService.getUsers().subscribe(res => {
        this.users=res;
        this.UserSubject.next(this.users);
      }
    )
  }

  getPosts(){
    return this.PostSubject;
  }


  addPost(post:Post){
    this.dataService.addPost(post)
      .subscribe((res => {
        let userRes = res as UserResponse;
        this.posts.push({id:userRes.name, ...post});
        this.PostSubject.next(this.posts);
      }));
  }

  getUserById(id:string){
    return this.users.find(u => u.id==id);
  }

  getPost(postId:string){
    return this.posts.find(c => c.id==postId);
  }

  deletePost(id:string){
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
