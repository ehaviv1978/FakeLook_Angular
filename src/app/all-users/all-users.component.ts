import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: User[];
  user: User;
  imageurl: string;
  searchString: string;



  constructor(private userServ: UserService, private route: ActivatedRoute) { }

  getUsers() {
    this.userServ.getUsers().subscribe(res => {
      this.users = res;
    });
    this.user = null;
  }

  searchUsers(str:string) {
    this.userServ.searchUsers(str).subscribe(res => {
      this.users = res;
    });
    this.user = null;
  }

  async showUserDetail(user: User) {
    this.user = user;
    this.imageurl = user.picture;
    //   const STRING_CHAR = await String.fromCharCode.apply(null, user.picture.data);
    //   let base64String = await btoa(STRING_CHAR);
    //   this.imageurl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + base64String);
  }

  userSearch(str:string){
    if (str==null){
      this.getUsers();
    }else{
      this.searchUsers(str)
    }
  }

  async ngOnInit() {
    this.route.params.subscribe(
      params => {
        const str = params['search'];
        this.userSearch(str);
      }
    );
  }

}
