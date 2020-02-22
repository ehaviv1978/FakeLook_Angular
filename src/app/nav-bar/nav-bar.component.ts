import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public user:User;
  viewShow = "createAccount";
  constructor(userServ: UserService) { }

  newLogIn(event){
    this.viewShow = "sideBar";
    this.user=event;
    console.log(this.user)
  }

  logOut(){
    this.viewShow="createAccount";
    this.user=null;
  }

  changeView(val: string) {
    this.viewShow = val;
  }


  ngOnInit() {
  }

}
