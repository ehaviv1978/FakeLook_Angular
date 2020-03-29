import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostLikes } from '../models/postLikes';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostLikeService {

  private likeUrl;
  constructor( private http: HttpClient ,private userServ:UserService) { }
  
  addLike(postLikes:PostLikes){
    this.setURL(postLikes.postId);
    this.http.post<PostLikes>(this.likeUrl,postLikes).subscribe();
  } 
   removeLike(postLikes:PostLikes){
    this.setURL(postLikes.postId);
    this.http.delete<PostLikes>(this.likeUrl).subscribe();
  }
  setURL(postId:number){
    this.likeUrl = `http://localhost:8888/api/posts/${postId}/likes`
  }
}
