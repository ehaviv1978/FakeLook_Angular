import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(public userServ: UserService,private router: Router) { }
  
  ngOnInit() {
      this.userServ.logedUser=null;
      this.router.navigateByUrl('/logIn'); 
  }
}
