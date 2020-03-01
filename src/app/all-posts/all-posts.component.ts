import { Component, OnInit } from '@angular/core';
import {Post} from '../models/post';
import {PostService} from '../services/post.service';


@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']

})
export class AllPostsComponent implements OnInit {
  posts: Post[];
  post: Post;
  imageurl:string;
  constructor(private postServ: PostService) { }

  async showPic(post){
    this.post = post;
    this.imageurl=post.picture;
  }

  ngOnInit() {
  }

}
