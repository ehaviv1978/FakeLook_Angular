import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: any = [];
  user: any;
  birthDate;
  birthDateStr;
  search: string;
  img:any;
  imageurl:SafeUrl;


  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  getUsers() {
    this.http.get('http://localhost:8888/api/users').subscribe(res => {
      this.users = res;
      console.log(this.users)
    });
  }

  searchUsers() {
    this.http.get(`http://localhost:8888/api/users/${this.search}`).subscribe(res => {
      this.users = res;
      console.log(this.users)
    });
  }

  searchBox(s:string) {
    this.search = s;
  }
  
  async showUserDetail(event){
    this.user = this.users[event.toElement.id];
    this.birthDate = new Date(this.user.BirthDate);
    this.birthDateStr = this.birthDate.getDate() + "/" + this.birthDate.getMonth() + "/"  + this.birthDate.getFullYear();
    // let objectURL = 'data:image/jpeg;base64,' + this.user.Picture;
    // this.img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    const TYPED_ARRAY = await new Uint8Array(this.user.Picture);
    const STRING_CHAR = await String.fromCharCode.apply(null, TYPED_ARRAY);
    let base64String = await btoa(STRING_CHAR);
    this.imageurl = await this.sanitizer.bypassSecurityTrustUrl('data:image/JPEG;base64, ' + base64String);
    console.log(this.user);
  }

  ngOnInit() {
    this.getUsers();
  }

}
