import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faUser, faEnvelope,faCalendar, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faUserMd, faLock,faCamera  } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  @Input() public parentData;
  user:User;
  faCamera= faCamera;
  faFile = faFolderOpen;
  
  public imagePath;
  imgURL: any;
  public message: string;
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    console.log(this.imagePath[0].name)
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }

  }

  async newPosts() {
    console.log(this.imgURL);
    let blob = await fetch(this.imgURL).then(r => r.blob());    
    console.log(blob);
    let aray = await new Response(blob).arrayBuffer();
    console.log(aray);

    let post = 
  {
    picture : aray,
    userId : 2,
    description: "test 3",
    latGPS: 32.11,
    longGPS: 32.14
  }
  console.log(post.picture);
  //   this.http.post('http://localhost:8888/api/posts',post)
  // .subscribe(res =>
  // console.log(res));
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.user= this.parentData;
    console.log("hello");
    console.log(this.user);
  }

}
