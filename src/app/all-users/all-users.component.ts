import { Component, OnInit} from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';



@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: User[];
  imageurl: string;
  searchString: string;

  constructor(private userServ: UserService, private route: ActivatedRoute, private router: Router) { }

  getUsers() {
    this.userServ.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  searchUsers(str:string) {
    this.userServ.searchUsers(str).subscribe(res => {
      this.users = res;
    });
  }

  async showUserDetail(user: User) {
    this.router.navigate(['/user', user.userId]);
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
