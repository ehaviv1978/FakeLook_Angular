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
  jobs = ['Designer','Manager','Accaunting','Unemployed','Engenier','Doctor'];
  submitted = false;
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

  password2="";

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


  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }


  @Output() public logInEvent = new EventEmitter();
  @Output() public userLogIn = new EventEmitter();

  constructor(private http: HttpClient, private userServ: UserService) { }

  onSubmit() {
    this.submitted = true;
    if (this.user.password == this.password2) {
      console.log(this.user);
      // this.http.post('http://localhost:8888/api/users/addUser', this.user).subscribe(res => {
      //   console.log(res)
      //   this.logInEvent.emit(this.user);
      // });
    }else{
        document.getElementById("passwordA").style.visibility = "visible";
    }
  }

  passwordTyped(){
    document.getElementById("passwordA").style.visibility = "hidden";
  }
  createAcountInputCheck(){
  //  document.getElementById("passwordA").style.visibility = "hidden";
  }

  user_LogIn(){
    this.userLogIn.emit();
  }

  ngOnInit() {
    document.getElementById("passwordA").style.visibility = "hidden";
  }

  ngAfterViewInit() {
    document.getElementById("passwordA").style.visibility = "hidden";
        //document.getElementById("btnCreate").style.visibility = "hidden";
  }

}
