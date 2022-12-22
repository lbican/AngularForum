import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostsService} from "../posts/posts.service";
import {User} from "../shared/user.model";
import {Post} from "../shared/post.model";
import {BehaviorSubject, Subscription} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userId:string = '';
  posts: Post[] = [];

  postSubject : BehaviorSubject<Post[]> | null = null;

  subscription : Subscription | null = null;

  constructor(private route: ActivatedRoute, private postsService: PostsService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['uid']
    this.postSubject = this.postsService.getPosts();
    this.subscription=this.postSubject.subscribe(
      res => {
        this.posts=res.filter((post) => post.userId === this.userId);
      }
    )
  }

  getUser():User{
    return <User>this.postsService.getUserById(this.userId);
  }

  getTime(time: Date): string{
    let convertTime = new Date(time);
    return convertTime.toLocaleString();
  }
}
