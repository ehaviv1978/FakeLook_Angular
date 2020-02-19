import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  post = 
  {
    userId : 2,
    description: "test",
    latGPS: 32.11,
    longGPS: 32.14
  }
  


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

  newPosts() {
    this.http.post('http://localhost:8888/api/posts',  {
      userId : 2,
      description: "test",
      latGPS: 32.11,
      longGPS: 32.14
  })
  .subscribe(res =>
  console.log(res));
    // }JSON.stringify(this.post))
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
