import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private postUrl;

  constructor( private http: HttpClient ) { }
  getComments(postId:number):Observable<Comment[]>{
    this.setURL(postId);
    return this.http.get<Comment[]>(this.postUrl);
}
  createComment(comment:Comment,postId:number){
    this.setURL(postId);
    this.http.post<Comment>(this.postUrl,comment).subscribe();
  }
  setURL(postId:number){
    this.postUrl = `http://localhost:8888/api/posts/${postId}/comments`
  }
}
