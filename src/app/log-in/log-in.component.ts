import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faKey, faList } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  constructor(private authServ: AuthService,private router: Router,private userServ:UserService) { }

  onSubmit() {
    this.authServ.userLogIn(this.emailInput, this.passwordInput).subscribe(authResponse => {
      console.log(authResponse);
      if (authResponse.auth) {
         localStorage.setItem("authToken",authResponse.authToken);
         this.userServ.getUserById(authResponse.userId).subscribe(data =>{
           this.userServ.logedUser = data[0]
          });
        this.router.navigateByUrl('/map');
      }
        // document.getElementById("activeComponent").style.left="250px";
        // this.userServ.logedUser = user[0];
    }, (err) =>{
      if (err.status === 401){
        this.validEmailandPassword = false;
      }
    });
  }

  ngOnInit() {
   // document.getElementById("activeComponent").style.left="5px";
  }

  createAcount() {
    this.router.navigateByUrl('/createAccount');
  }

}
