import { Component, OnInit,Input } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  @Input('parentData') searchString ;
  users: User[];
  user: User;
  search: string;
  imageurl:string;


  constructor(private userServ: UserService) { }

  getUsers() {
    this.userServ.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  searchUsers() {
    this.userServ.searchUsers(this.searchString).subscribe(res =>{
      this.users = res;
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

  onSearch(){
    if (this.searchString==null){
      this.getUsers();
    }else{
      this.searchUsers()
    }
    this.user=null;
  }

  ngOnInit() {
    if (this.searchString==null){
      this.getUsers();
    }else{
      this.searchUsers()
    }
  }

}
