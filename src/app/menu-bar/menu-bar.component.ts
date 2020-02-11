import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
// export class MenuBarComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
export class MenuBarComponent {
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
