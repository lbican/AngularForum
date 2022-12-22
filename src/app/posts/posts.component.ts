import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {User} from "../shared/user.model";
import {Post} from "../shared/post.model";
import {BehaviorSubject, Subscription, Timestamp} from "rxjs";
import {PostsService} from "./posts.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy{
  user: User | null = null;
  posts : Post[] = [];
  postSubject : BehaviorSubject<Post[]> | null = null;
  subscription : Subscription | null = null;

  add : boolean = false;
  new : Post = new Post();
  selectedPost : Post = new Post();
  mode : string = '';
  constructor(private auth : AuthService, private router : Router, private postsService : PostsService) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.postSubject = this.postsService.getPosts();
    this.subscription=this.postSubject.subscribe(
      res => {
        this.posts=res;
      }
    )

    if(!this.auth.isAuthenticated()){
      this.router.navigate(['/login']).then(() => Promise.resolve());
    }
  }

  isEditableByUser(postUid: string):boolean{
    return this.user?.id === postUid
  }

  addPost(){
    this.mode = '';
    this.postsService.addPost({
      userId: this.user?.id || 'Unknown',
      timestamp: new Date(),
      comment: this.new.comment
    });
  }

  getTime(time: Date): string{
    let convertTime = new Date(time);
    return convertTime.toLocaleString();
  }

  deletePost(index: number){
    console.log('Deleting post with index');
    let post = this.posts[index];
    console.log(post)
    this.postsService.deletePost(post.id!);
  }

  getPostUser(id:string):string{
    return <string>this.postsService.getUserById(id)?.username
  }

  startEditing(post: Post){
    this.selectedPost = {...post}
    this.mode = 'edit';
  }

  editPost(){
    this.postsService.editPost(this.selectedPost);
    this.mode = '';
  }

  startAdding(){
    this.selectedPost = new Post();
    this.mode = 'add';
  }

  onCancel(){
    this.mode = '';
    this.selectedPost = {id: '', comment: '', userId: '', timestamp: new Date()}
  }

  logout(){
    this.auth.logout();
  }

  getUser(): User{
    return this.auth.getUser();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
