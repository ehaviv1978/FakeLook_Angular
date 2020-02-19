import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import {Post} from '../models/post';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: Post[];
  post: Post;
  imageurl:SafeUrl;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  getPosts() {
<<<<<<< HEAD
    this.http.get('http://localhost:8888/api/posts').subscribe(res => {
=======
    this.http.get<Post[]>('http://localhost:8888/api/Posts').subscribe(res => {
>>>>>>> 4034c22ff5df2c665cd309788b913fcf08e9b041
      this.posts = res;
      console.log(this.posts);
    });
  }

  async showPic(post){
    this.post = post;

    const STRING_CHAR = await String.fromCharCode.apply(null, post.picture.data);

    let base64String = await btoa(STRING_CHAR);
    this.imageurl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + base64String);
  }

  ngOnInit() {
    this.getPosts();
  }

}
