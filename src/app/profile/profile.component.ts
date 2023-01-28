import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostsService} from "../posts/posts.service";
import {User} from "../shared/user.model";
import {Post} from "../shared/post.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userId:string = '';
  posts: Post[] = [];

  user: User = new User();
  postSubject : BehaviorSubject<Post[]> | null = null;

  subscription : Subscription | null = null;


  constructor(private route: ActivatedRoute, private postsService: PostsService, private dataService: DataService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['uid']
    this.postSubject = this.postsService.getPosts();
    this.dataService.getUser(Number(this.userId))
      .subscribe(res => {
        this.user=res;
      })
    this.subscription=this.postSubject.subscribe(
      res => {
        console.log(res)
        this.posts=res.filter((post) => post.userId === Number(this.userId));
      }
    )
  }

  getUser():User{
    return new User();
  }

  getTime(time: string): string{
    let convertTime = new Date(time);
    return convertTime.toLocaleString();
  }
}
