import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //private userUrl = 'http://host.docker.internal:8888/api/users'
  private userUrl = 'http://localhost:8888/api/users'
  public logedUser: User;

  constructor( private http: HttpClient ) { }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.userUrl);
  }

  searchUsers(searchParam):Observable<User[]>{
    return this.http.get<User[]>(this.userUrl+"/search/"+searchParam)
  }

  userLogIn(logInEmail, password):Observable<User[]>{
    return this.http.post<User[]>(this.userUrl +"/logIn", {"email": logInEmail, "password": password});
 }

  createUser(newUser):Observable<User[]>{
    return this.http.post<User[]>(this.userUrl+"/addUser", newUser);
    // need to add database addition verification!
  }
 
 changeUserPicture(imgUrl,userId):Observable<User[]>{
   return this.http.post<User[]>(this.userUrl +"/picture", {"file": imgUrl ,"userId": userId});
}

changePassword(password):Observable<User[]>{
  return this.http.post<User[]>(this.userUrl +"/changePassword/"+ this.logedUser.userId, {"password": password});
 }

 getUserById(userId: number){
  return this.http.get<User[]>(this.userUrl +"/"+userId);
 }
}
