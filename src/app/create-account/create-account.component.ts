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
  user: User = {
    userId: 0,
    firstName: "",
    lastName: "",
    password: "",
    job: "",
    birthDate: new Date("2019-01-16"),
    datejoined: new Date("2019-01-16"),
    picture: null,
    address: "",
    email: ""
  };


 // newUser = true;
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
    if ((<HTMLInputElement>document.getElementById("password1")).value ==
      (<HTMLInputElement>document.getElementById("password2")).value) {
      this.user.firstName = (<HTMLInputElement>document.getElementById("firstName")).value;
      this.user.lastName = (<HTMLInputElement>document.getElementById("lastName")).value;
      this.user.email = (<HTMLInputElement>document.getElementById("email")).value;
      this.user.address = (<HTMLInputElement>document.getElementById("address")).value;
      this.user.job = (<HTMLInputElement>document.getElementById("job")).value;
      this.user.password = (<HTMLInputElement>document.getElementById("password1")).value;
      this.user.birthDate = new Date((<HTMLInputElement>document.getElementById("birthDate")).value);

      console.log(this.user);
      this.http.post('http://localhost:8888/api/users/addUser', this.user).subscribe(res => {
        console.log(res)
        this.logInEvent.emit(this.user);
       // this.newUser = false;
      });
    }else{
      console.log("password are not the same");
      (<HTMLInputElement>document.getElementById("emailAllert")).textContent = "Password are not the same!";
        document.getElementById("emailAllert").style.visibility = "visible";
    }
  }

  createAcountInputCheck(){
    document.getElementById("emailAllert").style.visibility = "hidden";

  }

  // logInInputCheck() {
  //   //console.log('hi');
  //   document.getElementById("passwordAllert").style.visibility = "hidden";
  //   document.getElementById("emailAllert").style.visibility = "hidden";
  //   console.log((<HTMLInputElement>document.getElementById("inputPassword")).value);
  //   console.log((<HTMLInputElement>document.getElementById("emailLogIn")).value);
  //   if ((<HTMLInputElement>document.getElementById("inputPassword")).value &&
  //     ((<HTMLInputElement>document.getElementById("emailLogIn")).value)) {
  //     document.getElementById("btnLogIn").style.visibility = "visible";
  //   } else {
  //     document.getElementById("btnLogIn").style.visibility = "hidden";
  //   }
  // }

  // logIn() {
  //   let email = ((<HTMLInputElement>document.getElementById("emailLogIn")).value);
  //   this.http.get('http://localhost:8888/api/users/logIn' + "/" + email).subscribe(res => {
  //     // console.log(res[0]);
  //     if (res[0] == undefined) {
  //       (<HTMLInputElement>document.getElementById("emailAllert")).textContent = "Email is incorect";
  //       document.getElementById("emailAllert").style.visibility = "visible";
  //     } else {
  //       if (res[0].password == (<HTMLInputElement>document.getElementById("inputPassword")).value) {
  //         console.log("loged in");
  //         this.logInEvent.emit(res[0]);
  //       } else {
  //         console.log("incorect password");
  //         (<HTMLInputElement>document.getElementById("passwordAllert")).textContent = "Wrong Password!";
  //         document.getElementById("passwordAllert").style.visibility = "visible";
  //       }

  //     }
  //   });
  // }

  @Output() public logInEvent = new EventEmitter();
  @Output() public userLogIn = new EventEmitter();

  user_LogIn(){
    this.userLogIn.emit();
  }

  ngOnInit() {
    document.getElementById("passwordAllert").style.visibility = "hidden";

  }

  ngAfterViewInit() {
    document.getElementById("passwordAllert").style.visibility = "hidden";
    //document.getElementById("btnCreate").style.visibility = "hidden";

  }

}
