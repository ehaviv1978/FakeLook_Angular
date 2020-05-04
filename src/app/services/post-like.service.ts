import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostLikes } from '../models/postLikes';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostLikeService {

  //private postUrl = "http://host.docker.internal:8888/api/posts/";
  private postUrl = "http://localhost:8888/api/posts/";

  constructor( private http: HttpClient ,private userServ:UserService) { }
  addLike(postLikes:PostLikes){
    this.http.post<PostLikes>(this.postUrl + postLikes.postId + "/" + 
    this.userServ.logedUser.userId,postLikes).subscribe();
  } 
   removeLike(postLikes:PostLikes){
    this.http.delete<PostLikes>(this.postUrl + postLikes.postId + "/" + 
    this.userServ.logedUser.userId).subscribe();
  }
}
