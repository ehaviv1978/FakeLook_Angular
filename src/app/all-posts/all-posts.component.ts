import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
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
  imageurl:SafeUrl;
  constructor(private postServ: PostService, private sanitizer: DomSanitizer) { }

  async showPic(post){
    this.post = post;
    console.log(post.picture)
    this.imageurl=post.picture;

    // const STRING_CHAR = await String.fromCharCode.apply(null , post.picture.data);

    // let base64String = await btoa(STRING_CHAR);
    // this.imageurl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + base64String);
  }

  ngOnInit() {
  }

}
