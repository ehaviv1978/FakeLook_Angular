import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user';
import {PostOutput} from '../models/post';
import { PostService } from '../services/post.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  @Input() public parentData;
  user: User;
  post: PostOutput={
    userId: 0,
    latGPS: 1,
    longGPS:1,
    picture: null,
    description:"",
  };
  faCamera = faCamera;
  faFile = faFolderOpen;
  public imagePath;
  public message: string;
  uploadMassage = "";
  
  constructor(private postServ: PostService) { }

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
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.post.picture = <string>reader.result;
    }
    this.uploadMassage = "Image preview:"
  }

  async onUpload() {
    // await this.getPosition().then(pos=>
    //   {
    //     this.post.latGPS = pos.lat;
    //     this.post.longGPS = pos.lng;
    //   });
    this.post.latGPS = Math.random() * 89 * (Math.round(Math.random()) * 2 - 1);
    this.post.longGPS = Math.random() * 179 * (Math.round(Math.random()) * 2 - 1);
    this.postServ.addPost(this.post).subscribe(res => {
        if (res.length == 1) {
          this.uploadMassage = "New post uploaded";
          this.imagePath = null;
          this.post.picture = null;
          this.message = null;
          this.file.nativeElement.value = "";
          this.post.description = "";
        }
      });
  }

  @ViewChild('file', { static: true }) file: ElementRef;

  onCancel() {
    this.imagePath = null;
    this.post.picture = null;
    this.message = null;
    this.file.nativeElement.value = "";
    this.post.description = "";
    this.uploadMassage = ""
  }

  ngOnInit() {
    this.user = this.parentData;
    this.post.userId= this.user.userId;
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }

}
