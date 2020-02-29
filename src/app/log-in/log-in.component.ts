import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  @Input() public parentData;
  @Output() public logInEvent = new EventEmitter();
  @Output() public createAcount = new EventEmitter();


  emailInput = "";
  passwordInput = "";
  validEmail = true;
  validPassword = true;

  faEmail = faEnvelope;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faKey = faKey;

  constructor(private userServ: UserService) { }

  onSubmit() {
    this.userServ.userLogIn(this.emailInput).subscribe(user => {
      if (user[0] == undefined) {
        this.validEmail = false;
      } else {
        if (user[0].password == this.passwordInput) {
          this.logInEvent.emit(user[0]);
        } else {
          this.validPassword = false;
        }
      }
    });
  }

  ngOnInit() {
  }

  create_Acount() {
    this.createAcount.emit();
  }

}
