import { Component, OnInit} from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public user:User;
  public userSearch: string ="";
  viewShow = "logIn";

  constructor(private userServ: UserService) { }

  newLogIn(){
    this.user=this.userServ.logedUser;
    this.viewShow = "sideBar";
  }

  logOut(){
    this.viewShow="logIn";
    this.user=null;
  }

  changeView(val: string) {
    this.viewShow = val;
  }

  ngOnInit() {
  }

}
