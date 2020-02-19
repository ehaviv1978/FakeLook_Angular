import { Component, OnInit } from '@angular/core';
import { faPhone, faUserMd, faLock,faCamera  } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-change-user-picture',
  templateUrl: './change-user-picture.component.html',
  styleUrls: ['./change-user-picture.component.css']
})
export class ChangeUserPictureComponent implements OnInit {
  faCamera= faCamera;

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

  constructor() { }

  ngOnInit() {
  }

}
