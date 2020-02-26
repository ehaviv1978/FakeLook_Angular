import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
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


  faEmail = faEnvelope;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faKey = faKey;

  constructor(private http: HttpClient, private userServ: UserService) { }

  logInInputCheck() {
    //console.log('hi');
    document.getElementById("passwordAllert").style.visibility = "hidden";
    document.getElementById("emailAllert").style.visibility = "hidden";
    console.log((<HTMLInputElement>document.getElementById("inputPassword")).value);
    console.log((<HTMLInputElement>document.getElementById("emailLogIn")).value);
    if ((<HTMLInputElement>document.getElementById("inputPassword")).value &&
      ((<HTMLInputElement>document.getElementById("emailLogIn")).value)) {
      document.getElementById("btnLogIn").style.visibility = "visible";
    } else {
      document.getElementById("btnLogIn").style.visibility = "hidden";
    }
  }

  onSubmit() {
    let email = ((<HTMLInputElement>document.getElementById("emailLogIn")).value);
    this.http.get('http://localhost:8888/api/users/logIn' + "/" + email).subscribe(res => {
      // console.log(res[0]);
      if (res[0] == undefined) {
        (<HTMLInputElement>document.getElementById("emailAllert")).textContent = "Email is incorect";
        document.getElementById("emailAllert").style.visibility = "visible";
      } else {
        if (res[0].password == (<HTMLInputElement>document.getElementById("inputPassword")).value) {
          console.log("loged in");
          this.logInEvent.emit(res[0]);
        } else {
          console.log("incorect password");
          (<HTMLInputElement>document.getElementById("passwordAllert")).textContent = "Wrong Password!";
          document.getElementById("passwordAllert").style.visibility = "visible";
        }

      }
    });
  }

  @Output() public logInEvent = new EventEmitter();
  @Output() public createAcount = new EventEmitter();

  ngOnInit() {
  }

  create_Acount(){
    this.createAcount.emit();
  }
  ngAfterViewInit() {
    document.getElementById("btnLogIn").style.visibility = "hidden";
    document.getElementById("passwordAllert").style.visibility = "hidden";
    document.getElementById("emailAllert").style.visibility = "hidden";
    document.getElementById("btnCreate").style.visibility = "hidden";

  }

}
