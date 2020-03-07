import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import { PostLikes } from '../models/postLikes';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {
  posts: Post[];

  constructor(private postServ: PostService, private userServ: UserService, private router: Router) { }

  async clickOnPost(post: Post) {
    await this.postServ.getPost(this.userServ.logedUser.userId, post.postId).subscribe(data =>{
      this.postServ.currentPost= data[0];
     this.router.navigate(['/post', post.postId]);
    });   
  }

  getPosts() {
    this.postServ.getPosts(this.userServ.logedUser.userId).subscribe(data => {
      this.posts = data;
      console.log(data);
    });
  }

  ngOnInit() {
    this.getPosts();
  }
}
