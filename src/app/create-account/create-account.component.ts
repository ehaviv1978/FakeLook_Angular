import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser, faEnvelope, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faUserMd, faLock, faHome, faKey } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit {

  @Input() public parentData;
  @Output() public logInEvent = new EventEmitter();
  @Output() public userLogIn = new EventEmitter();

  user: User ={
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
  
  jobs = ['Designer','Manager','Accaunting','Unemployed','Engenier','Doctor'];
  submitted = false;
  public joblDefaultValue: string = "Choose your job";
  passwordConfirm:string;

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

  constructor(private http: HttpClient, private userServ: UserService) { }

  onSubmit() {
    this.submitted = true;
      this.http.post('http://localhost:8888/api/users/addUser', this.user).subscribe(res => {
        this.logInEvent.emit(this.user);
      });
  }

  user_LogIn(){
    this.userLogIn.emit();
  }

  ngOnInit() {
  }

}
