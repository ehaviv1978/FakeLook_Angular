import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../models/user';
import {authResponse} from '../models/authResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8888/api/users'
  public logedUser: User;

  constructor( private http: HttpClient ) { }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.userUrl);
  }

  searchUsers(searchParam):Observable<User[]>{
    console.log(searchParam)
    return this.http.get<User[]>(this.userUrl+"/"+searchParam)
  }
  
 changeUserPicture(imgUrl,userId):Observable<User[]>{
    return this.http.post<User[]>(this.userUrl +"/picture", {"file": imgUrl ,"userId": userId});
 }

 getUserById(userId: number){
  return this.http.get<User[]>('http://localhost:8888/api/user/'+userId);
 }
}
