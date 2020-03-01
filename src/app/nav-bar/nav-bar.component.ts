import { Component, OnInit, ViewChild} from '@angular/core';
import { User } from '../models/user';
import { AllUsersComponent }  from '../all-users/all-users.component';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public user:User;
  public userSearch: string;
  viewShow = "logIn";

  constructor() { }

  @ViewChild(AllUsersComponent) allUsers: AllUsersComponent;

  newLogIn(event){
    this.viewShow = "sideBar";
    this.user=event;
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
