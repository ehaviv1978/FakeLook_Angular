import { Component, OnInit, Sanitizer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { User } from '../models/user';
import { UserService } from '../services/user.service';


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


  constructor(private userServ: UserService, private sanitizer: DomSanitizer) { }

  getUsers() {
    this.userServ.getUsers().subscribe(res => {
      this.users = res;
      console.log(res);
    });
  }

  searchUsers() {
    this.userServ.searchUsers(this.search).subscribe(res =>{
      this.users = res;
    });
  }

  searchBox(s:string) {
    this.search = s;
  }
  
  async showUserDetail(user){
    this.user = user;

    const STRING_CHAR = await String.fromCharCode.apply(null, user.picture.data);
    let base64String = await btoa(STRING_CHAR);
    this.imageurl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + base64String);
  }


  ngOnInit() {
    this.getUsers();
  }

}
