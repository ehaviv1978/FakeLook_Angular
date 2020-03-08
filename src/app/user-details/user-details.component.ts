import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User = this.userServ.logedUser;

  constructor(private userServ: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let userId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.userServ.getUserById(userId).subscribe(data => {
      this.user = data[0];
    });
  }

}
