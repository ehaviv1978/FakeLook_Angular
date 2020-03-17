import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../models/user';
import {authResponse} from '../models/authResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userUrl = 'http://localhost:8888/api/auth/'

  constructor( private http: HttpClient ) { }

  userLogIn(logInEmail, password){
    return this.http.post<authResponse>(this.userUrl+'login', {"email": logInEmail, "password": password});
 }

  createUser(newUser):Observable<User[]>{
    return this.http.post<User[]>(this.userUrl+'register', newUser);
  }
}
