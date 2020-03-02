import { Component, OnInit, ViewChild} from '@angular/core';
import { User } from '../models/user';
import { AllUsersComponent }  from '../all-users/all-users.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public user:User;
  public userSearch: string;
  viewShow = "logIn";

  constructor(private userServ: UserService) { }

  @ViewChild(AllUsersComponent) allUsers: AllUsersComponent;

  newLogIn(event){
    //this.user=event;
    this.user=this.userServ.logedUser;
    this.viewShow = "sideBar";
    console.log(this.user)
  }

  logOut(){
    this.viewShow="logIn";
    this.user=null;
  }

  changeView(val: string) {
    this.viewShow = val;
  }

  onSearch(){
    this.viewShow="allUsers";
    if (this.allUsers){
      this.allUsers.onSearch();
    }
  }

  ngOnInit() {
  }

}
