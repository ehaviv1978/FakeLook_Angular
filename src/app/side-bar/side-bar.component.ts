import { Component, OnInit,Input } from '@angular/core';
import { User } from '../models/user';
import { Post } from '../models/post';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Input() public parentData;
  currentPost:Post;
  user:User;
  

  viewShow = "map";

  constructor(private userServ: UserService,private router: Router) { }

  ngOnInit() {
    this.user= this.userServ.logedUser;   
    this.router.navigateByUrl('/map');
    //this.user= this.parentData;
    console.log(this.user);
  }

  showPost($event){
    this.viewShow = "postDetails";
    this.currentPost = $event;
  }
}
