import { Component, OnInit } from '@angular/core';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userServ: UserService) { }

  faPassword = faLock;
  password="";
  passwordConfirm="";
  massage="Enter new password"

  onSubmit(){
    this.userServ.changePassword(this.password).subscribe(res => {
      if (res.length == 1) {
        this.massage = "Password updated!";
      }
    });
  }

  
  inputChange() {
    this.massage = "Enter new password";
  }

  ngOnInit(): void {
  }

}
