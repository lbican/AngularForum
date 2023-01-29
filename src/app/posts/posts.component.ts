import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {User} from "../shared/user.model";
import {Post} from "../shared/post.model";
import {BehaviorSubject, Subscription} from "rxjs";
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

  isEditableByUser(postUid: number):boolean{
    return this.user?.id === postUid
  }

  addPost(){
    const date = new Date().toLocaleString()
                           .slice(0, 19)
                           .replace('T', ' ');

    this.mode = '';
    this.postsService.addPost({
      userId: this.user!.id,
      comment: this.new.comment
    });
  }

  getTime(time: string): string{
    let convertTime = new Date(time);
    return convertTime.toLocaleString();
  }

  deletePost(postId: number){
    console.log('Deleting post with index', postId);
    this.postsService.deletePost(postId);
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
    this.selectedPost = {username: '', id: 0, comment: '', userId: 0, timestamp: new Date().toLocaleString()}
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
