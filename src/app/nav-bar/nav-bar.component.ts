import { Component, OnInit} from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public user:User;
  public userSearch: string ="";
  viewShow = "logIn";

  constructor(public userServ: UserService,private router: Router) { }

  newLogIn(){
    this.user=this.userServ.logedUser;
    this.viewShow = "sideBar";
  }

  logOut(){
    this.viewShow="logIn";
    this.userServ.logedUser=null;
    this.router.navigateByUrl('/logIn');
  }

  changeView(val: string) {
    this.viewShow = val;
  }

  ngOnInit() {
  }

}
