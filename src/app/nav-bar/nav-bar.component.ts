import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public userSearch: string = "";

  constructor(public userServ: UserService, private router: Router) { }

  logOut() {
    this.userServ.logedUser = null;
    this.router.navigateByUrl('/logIn');
  }

  showUserDetail() {
    this.router.navigate(['/user', this.userServ.logedUser.userId]);
  }

  ngOnInit() {
  }

}
