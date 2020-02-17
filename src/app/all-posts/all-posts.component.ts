import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: any =[];
  post: any;
  img:any;
  imageurl:SafeUrl;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  getPosts() {
    this.http.get('http://localhost:8888/api/Posts').subscribe(res => {
      this.posts = res;
      console.log(this.posts);
    });
  }

  async showPic(event){
    this.post = this.posts[event.toElement.id];
    const TYPED_ARRAY = new Uint8Array(this.post.Image.data);
    console.log(TYPED_ARRAY);

    const STRING_CHAR = await String.fromCharCode.apply(null, TYPED_ARRAY);
    await console.log(STRING_CHAR);

    let base64String = await btoa(STRING_CHAR);
    await console.log(base64String);
    this.imageurl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + base64String);
  //  console.log(event.toElement.title)
  }

  ngOnInit() {
    this.getPosts();
  }

}
