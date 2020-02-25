import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {
  posts: Post[];

  constructor(private postServ: PostService) { }
  @Output() clickPostEvent = new EventEmitter<Post>();

  clickOnPost(post: Post) {
    this.clickPostEvent.emit(post);
  }

  getPosts() {
    this.postServ.getPosts().subscribe(data => {
      this.posts = data;
    });
  }

  ngOnInit() {
    this.getPosts();
  }
}
