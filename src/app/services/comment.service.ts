import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentUrl;

  constructor( private http: HttpClient ) { }
  getComments(postId:number):Observable<Comment[]>{
    this.setURL(postId);
    return this.http.get<Comment[]>(this.commentUrl);
}
  createComment(comment:Comment){
    this.setURL(comment.postId);
    this.http.post<Comment>(this.commentUrl,comment).subscribe();
  }
  setURL(postId:number){
    this.commentUrl = `http://localhost:8888/api/posts/${postId}/comments`
  }
}
