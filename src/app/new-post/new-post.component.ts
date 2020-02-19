import { Component, OnInit } from '@angular/core';
import { faUser, faEnvelope,faCalendar, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faUserMd, faLock,faCamera  } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  faCamera= faCamera;
  faFile = faFolderOpen;

  
  constructor() { }

  ngOnInit() {
  }
 

}
