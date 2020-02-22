import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter  } from '@fortawesome/free-brands-svg-icons';
import { faUser, faEnvelope,faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faUserMd, faLock,faHome  } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  user: User={
    userId:0,
    firstName:"",
    lastName:"",
    password:"",
    job :"",
    birthDate: new Date("2019-01-16"),
    datejoined:new Date("2019-01-16"),
    picture : null,
    address :"",
    email:""
  };

  newUser =false;
  faHome= faHome;
  faBirthDate= faCalendar;
  faPassword =faLock;
  faJob=faUserMd;
  faPhone = faPhone;
  faEmail=faEnvelope;
  faUser=faUser;
  faTwitter = faTwitter;
  faFacebook = faFacebook;


  constructor(private http: HttpClient,) { }

  onSubmit() {
    this.user.firstName= (<HTMLInputElement> document.getElementById("firstName")).value;
    this.user.lastName= (<HTMLInputElement> document.getElementById("lastName")).value;
    this.user.email= (<HTMLInputElement> document.getElementById("email")).value;
    this.user.address= (<HTMLInputElement> document.getElementById("address")).value;
    this.user.job= (<HTMLInputElement> document.getElementById("job")).value;
    this.user.password= (<HTMLInputElement> document.getElementById("password1")).value;
    this.user.birthDate= new Date((<HTMLInputElement> document.getElementById("birthDate")).value);

    console.log(this.user);
    this.http.post('http://localhost:8888/api/users/addUser', this.user).subscribe(res => {
      console.log(res)
    });
  }

  ngOnInit() {
  }

}
