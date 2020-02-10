import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fakelookApp';
  users: any = [];
  posts: any =[];
  search: string;

  constructor(private http: HttpClient) { }

  getUsers() {
    this.http.get('http://localhost:8888/api/users').subscribe(res => {
      this.users = res;
      console.log(this.users)
    });
  }

  searchUsers() {
    this.http.get(`http://localhost:8888/api/users/${this.search}`).subscribe(res => {
      this.users = res;
      console.log(this.users)
    });
  }

  getPosts() {
    this.http.get('http://localhost:8888/api/Posts').subscribe(res => {
      this.posts = res;
      console.log(this.users)
    });
  }

  searchBox(s:string) {
    this.search = s;
  }

}
