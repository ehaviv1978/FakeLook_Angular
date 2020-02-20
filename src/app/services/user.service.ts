import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8888/api/users'

  constructor( private http: HttpClient ) { }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.userUrl);
   }
  searchUsers(searchParam):Observable<User[]>{
    return this.http.get<User[]>(this.userUrl+"/"+searchParam)
  }
}
