import { Component, OnInit } from '@angular/core';
import { faPhone, faUserMd, faLock,faCamera  } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-user-picture',
  templateUrl: './change-user-picture.component.html',
  styleUrls: ['./change-user-picture.component.css']
})
export class ChangeUserPictureComponent implements OnInit {
  faCamera= faCamera;
  selectedFile :File = null;
  public imagePath;
  imgURL: any;
  public message: string;
  
  constructor(private http: HttpClient,) { }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    console.log(this.selectedFile);
    this.http.post('http://localhost:8888/api/users/picture', {"file": this.imgURL ,"userId": 2}).subscribe(res => {
      console.log(res)
    });
  }

  preview(files) {
    if (files.length === 0)
      return;
    this.selectedFile = <File>files[0];
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

  ngOnInit() {
  }

}
