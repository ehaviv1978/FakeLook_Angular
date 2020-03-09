import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser, faEnvelope, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faUserMd, faLock, faHome, faKey } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit {
  user: User = {
    userId: null,
    birthDate: null,
    picture: null,
    datejoined: null,
    email: "",
    address: "",
    firstName: "",
    lastName: "",
    password: "",
    job: "",
  };

  jobs = ['Designer', 'Manager', 'Accaunting', 'Unemployed', 'Engenier', 'Doctor', 'Mode','Politician','Banking','Other','Programer'];
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

  constructor(private userServ: UserService,private router: Router) { }

  onSubmit() {
    this.submitted = true;
    this.userServ.createUser(this.user).subscribe(res => {
      this.userServ.logedUser =this.user;
      this.router.navigateByUrl('/map');
    });
  }

  user_LogIn() {
    this.router.navigateByUrl('/logIn');
  }

  ngOnInit() {
  }

}
