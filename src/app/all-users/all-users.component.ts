import { Component, OnInit, Sanitizer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { User } from '../models/user';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: User[];
  user: User;
  search: string;
  imageurl:SafeUrl;


  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  getUsers() {
    this.http.get<User[]>('http://localhost:8888/api/users').subscribe(res => {
      this.users = res;
      console.log(this.users)
    });
  }

  searchUsers() {
    this.http.get<User[]>(`http://localhost:8888/api/users/${this.search}`).subscribe(res => {
      this.users = res;
      console.log(this.users)
    });
  }

  searchBox(s:string) {
    this.search = s;
  }
  
  async showUserDetail(user :User){
    this.user = user;
    this.imageurl=user.picture;
  //   const STRING_CHAR = await String.fromCharCode.apply(null, user.picture.data);
  //   let base64String = await btoa(STRING_CHAR);
  //   this.imageurl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + base64String);
  }


  ngOnInit() {
    this.getUsers();
  }

}
