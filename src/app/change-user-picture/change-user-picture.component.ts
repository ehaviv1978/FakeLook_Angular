import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
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
    // const fd = new FormData();
    // fd.append('image', this.selectedFile, this.selectedFile.name);
    console.log(this.imgURL);
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
      document.getElementById("btnUpdate").style.visibility = "hidden";
      document.getElementById("btnCancel").style.visibility = "hidden";
      this.imgURL=null;
      return;
    }
    this.message =null;
    document.getElementById("btnUpdate").style.visibility = "visible";
    document.getElementById("btnCancel").style.visibility = "visible";

    var reader = new FileReader();
    this.imagePath = files;
    //console.log(this.imagePath[0].name)
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  
  @ViewChild('file', {static: true}) fileUploader:ElementRef;
  

  onCancel(){
    // document.getElementById("btnUpdate").style.visibility = "hidden";
    //   document.getElementById("btnCancel").style.visibility = "hidden";
    //   this.imagePath = null;
    //   this.imgURL=null;
    //   this.message =null;
      this.fileUploader.nativeElement.value ="";
      console.log(this.fileUploader.nativeElement);
  }

  ngOnInit() {
    document.getElementById("btnUpdate").style.visibility = "hidden";
    document.getElementById("btnCancel").style.visibility = "hidden";
  }

}
