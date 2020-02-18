import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter  } from '@fortawesome/free-brands-svg-icons';
import { faUser, faEnvelope,faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faUserMd, faLock  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  faBirthDate= faCalendar;
  faPassword =faLock;
  faJob=faUserMd;
  faPhone = faPhone;
  faEmail=faEnvelope;
  faUser=faUser;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  constructor() { }

  ngOnInit() {
  }

}
