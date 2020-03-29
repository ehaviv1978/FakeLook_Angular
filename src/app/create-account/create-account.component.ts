import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser, faEnvelope, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faUserMd, faLock, faHome, faKey } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service'

import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit {
  user: User = {
    userId: null,
    birthDate: null,
    picture: 'http://localhost:4200/assets/images/avatar.png',
    datejoined: null,
    email: "",
    address: "",
    firstName: "",
    lastName: "",
    password: "",
    job: "",
  };

  jobs = ['Designer', 'Manager', 'Accaunting', 'Unemployed', 'Engenier', 'Doctor', 'Model','Politician','Banking','Other','Programer'];
  submitted = false;
  public joblDefaultValue: string = "Choose your job";
  passwordConfirm: string;

  faHome = faHome;
  faBirthDate = faCalendar;
  faPassword = faLock;
  faJob = faUserMd;
  faPhone = faPhone;
  faEmail = faEnvelope;
  faUser = faUser;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faKey = faKey;

  constructor(private authServ: AuthService,private router: Router,private userServ:UserService) { }

  onSubmit() {
    this.submitted = true;
    this.authServ.createUser(this.user).subscribe(authResponse => {
      if (authResponse.auth) {
        localStorage.setItem("authToken",authResponse.authToken);
        this.userServ.getUserById(authResponse.userId).subscribe(data =>{
          this.userServ.logedUser = data[0]
         });
       this.router.navigateByUrl('/map');
     }
    });
  }

  userLogIn() {
    this.router.navigateByUrl('/logIn');
  }

  ngOnInit() {
    document.getElementById("activeComponent").style.left="5px";
  }

}
