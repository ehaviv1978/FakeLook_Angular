import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faUser, faEnvelope, faCalendar, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faUserMd, faLock, faCamera } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  @Input() public parentData;
  user: User;
  faCamera = faCamera;
  faFile = faFolderOpen;
  lat: number;
  lng: number;

  public imagePath;
  imgURL: any;
  public message: string;

  preview(files) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      document.getElementById("btnPublish").style.visibility = "hidden";
      document.getElementById("btnCancel").style.visibility = "hidden";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    document.getElementById("btnPublish").style.visibility = "visible";
    document.getElementById("btnCancel").style.visibility = "visible";
    console.log(this.imagePath[0].name)
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  async onUpload() {
    // const fd = new FormData();
    // fd.append('image', this.selectedFile, this.selectedFile.name);
    // await this.getPosition().then(pos=>
    //   {
    //     this.lat = pos.lat;
    //     this.lng = pos.lng;
    //      //console.log(`Positon: ${pos.lng} ${pos.lat}`);
    //   });
    this.lat = Math.random() * 89 * (Math.round(Math.random()) * 2 - 1);
    this.lng = Math.random() * 179 * (Math.round(Math.random()) * 2 - 1);
    console.log(this.imgURL);
    this.http.post('http://localhost:8888/api/posts',
      {
        "picture": this.imgURL,
        "userId": this.user.userId,
        "description": (<HTMLInputElement>document.getElementById("description")).value,
        "latGPS": this.lat,
        "longGPS": this.lng
      }).subscribe(res => {
        console.log(res[0])
        if (res[0] == 1) {
          console.log("Picture Updated");
          document.getElementById("uploadMassage").innerText = "New post Add";
          document.getElementById("btnUpdate").style.visibility = "hidden";
          document.getElementById("btnCancel").style.visibility = "hidden";
        }
      });
  }

  @ViewChild('file', { static: true }) file: ElementRef;

  onCancel() {
    document.getElementById("btnPublish").style.visibility = "hidden";
    document.getElementById("btnCancel").style.visibility = "hidden";
    this.imagePath = null;
    this.imgURL = null;
    this.message = null;
    this.file.nativeElement.value = "";
  }

  async newPosts() {
    console.log(this.imgURL);
    let blob = await fetch(this.imgURL).then(r => r.blob());
    console.log(blob);
    let aray = await new Response(blob).arrayBuffer();
    console.log(aray);

    let post =
    {
      picture: aray,
      userId: 2,
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
    document.getElementById("btnPublish").style.visibility = "hidden";
    document.getElementById("btnCancel").style.visibility = "hidden";
    this.user = this.parentData;
    console.log("hello");
    console.log(this.user);
    // this.getPosition().then(pos=>
    //   {
    //      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    //   });
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
