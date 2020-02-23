import { Component, OnInit,Input } from '@angular/core';
import { User } from '../models/user';
import { Post } from '../models/post';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Input() public parentData;
  user:User;
  

  viewShow = "map";

  constructor() { }

  ngOnInit() {   
    this.user= this.parentData;
    console.log("hello");
    console.log(this.user);
  }
}
