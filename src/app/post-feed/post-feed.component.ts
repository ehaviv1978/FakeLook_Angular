import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import { PostLikes } from '../models/postLikes';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {
  @Input() public parentData;
  posts: Post[];

  constructor(private postServ: PostService) { }
  @Output() clickPostEvent = new EventEmitter<Post>();

  clickOnPost(post: Post) {
    this.clickPostEvent.emit(post);
  }

  getPosts() {
    this.postServ.getPosts(this.parentData.userId).subscribe(data => {
      this.posts = data;
      console.log(data);
    });
  }

  ngOnInit() {
    this.getPosts();
  }
}
