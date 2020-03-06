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

 // @Input() public parentData;
  @Output() public logInEvent = new EventEmitter();
  @Output() public createAcount = new EventEmitter();


  emailInput = "";
  passwordInput = "";
  validEmailandPassword = true;

  faEmail = faEnvelope;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faKey = faKey;

  constructor(private userServ: UserService) { }

  onSubmit() {
    this.userServ.userLogIn(this.emailInput, this.passwordInput).subscribe(user => {
      if (user[0] == undefined) {
        this.validEmailandPassword = false;
        console.log("fail");
      } else {
        // if (user[0].password == this.passwordInput) {
          this.userServ.logedUser =user[0];
          this.logInEvent.emit();

        } //else {
        //   this.validEmailandPassword = false;
        // }
      // }
    });
  }

  ngOnInit() {
  }

  create_Acount() {
    this.createAcount.emit();
  }

}
