import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  emailInput = "";
  passwordInput = "";
  validEmailandPassword = true;

  faEmail = faEnvelope;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faKey = faKey;

  constructor(private userServ: UserService,private router: Router) { }

  onSubmit() {
    this.userServ.userLogIn(this.emailInput, this.passwordInput).subscribe(user => {
      if (user[0] == undefined) {
        this.validEmailandPassword = false;
      } else {
       // document.getElementById("activeComponent").style.left="250px";
        this.userServ.logedUser = user[0];
        this.router.navigateByUrl('/map');
      }
    });
  }

  ngOnInit() {
   // document.getElementById("activeComponent").style.left="5px";
    this.userServ.logedUser = null;
  }

  createAcount() {
    this.router.navigateByUrl('/createAccount');
  }

}
