import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: any =[];
  picUrl ;
  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get('http://localhost:8888/api/Posts').subscribe(res => {
      this.posts = res;
    });
  }

  showPic(event){
    this.picUrl=event.toElement.title;
    console.log(event.toElement.title)
  }

  ngOnInit() {
    this.getPosts();
  }

}
