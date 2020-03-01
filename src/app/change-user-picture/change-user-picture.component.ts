import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-change-user-picture',
  templateUrl: './change-user-picture.component.html',
  styleUrls: ['./change-user-picture.component.css']
})

export class ChangeUserPictureComponent implements OnInit {
  @Input() public parentData;
  faCamera = faCamera;
  selectedFile: File = null;
  public imagePath;
  imgURL: any;
  public message: string;
  user: User;
  uploadMassage = "Image upload preview:";

  constructor(private userServ: UserService) { }

  onUpload() {
    this.userServ.changeUserPicture(this.imgURL, this.user.userId).subscribe(res => {
      if (res.length == 1) {
        this.uploadMassage = "Profile picture updated!";
      }
    });
    this.user.picture = this.imgURL;
  }

  preview(files) {
    if (files.length === 0)
      return;
    this.selectedFile = <File>files[0];
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      this.imgURL = null;
      return;
    }
    this.message = null;
    this.uploadMassage = "Image upload preview:";
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  @ViewChild('file', { static: true }) file: ElementRef;

  onCancel() {
    this.imagePath = null;
    this.imgURL = null;
    this.message = null;
    this.file.nativeElement.value = "";
  }

  ngOnInit() {
    this.user = this.parentData;
  }

}
