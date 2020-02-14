import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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

  constructor(private http: HttpClient) { }

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
  
  showUserDetail(event){
    this.user = this.users[event.toElement.id];
    this.birthDate = new Date(this.user.BirthDate);
    this.birthDateStr = this.birthDate.getDate() + "/" + this.birthDate.getMonth() + "/"  + this.birthDate.getFullYear();
    console.log(this.user);
  }

  ngOnInit() {
    this.getUsers();
  }

}
