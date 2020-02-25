import { Component, OnInit,ViewChild,ElementRef,Input } from '@angular/core';
import { faPhone, faUserMd, faLock,faCamera  } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Component({
  selector: 'app-change-user-picture',
  templateUrl: './change-user-picture.component.html',
  styleUrls: ['./change-user-picture.component.css']
})

export class ChangeUserPictureComponent implements OnInit {
  @Input() public parentData;
  faCamera= faCamera;
  selectedFile :File = null;
  public imagePath;
  imgURL: any;
  public message: string;
  user:User;
  constructor(private http: HttpClient,) { }

  onUpload(){
    // const fd = new FormData();
    // fd.append('image', this.selectedFile, this.selectedFile.name);
    console.log(this.imgURL);
    this.http.post('http://localhost:8888/api/users/picture', {"file": this.imgURL ,"userId": this.user.userId}).subscribe(res => {
      console.log(res[0])
      if (res[0] ==1){
        console.log("Picture Updated");
        document.getElementById("uploadMassage").innerText = "Profile picture updated!";
        document.getElementById("btnUpdate").style.visibility = "hidden";
        document.getElementById("btnCancel").style.visibility = "hidden";
      }
    });
  this.user.picture=this.imgURL;
  }

  preview(files) {
    if (files.length === 0)
      return;
    this.selectedFile = <File>files[0];
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      document.getElementById("btnUpdate").style.visibility = "hidden";
      document.getElementById("btnCancel").style.visibility = "hidden";
      this.imgURL=null;
      return;
    }
    this.message =null;
    document.getElementById("btnUpdate").style.visibility = "visible";
    document.getElementById("btnCancel").style.visibility = "visible";
    if ( document.getElementById("uploadMassage")){
      document.getElementById("uploadMassage").innerText = "Image upload preview:";
    }

    var reader = new FileReader();
    this.imagePath = files;
    //console.log(this.imagePath[0].name)
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  @ViewChild('file', {static: true}) file:ElementRef;
  
  onCancel(){
    document.getElementById("btnUpdate").style.visibility = "hidden";
      document.getElementById("btnCancel").style.visibility = "hidden";
      this.imagePath = null;
      this.imgURL=null;
      this.message =null;
      this.file.nativeElement.value ="";  
  }

  ngOnInit() {
    this.user= this.parentData;
    console.log("hello");
    console.log(this.user);
    document.getElementById("btnUpdate").style.visibility = "hidden";
    document.getElementById("btnCancel").style.visibility = "hidden";
  }

}
