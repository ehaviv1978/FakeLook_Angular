import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private postUrl = 'http://localhost:8888/api/posts/'

  constructor( private http: HttpClient ) { }
  getComments(postId:number):Observable<Comment[]>{
    return this.http.get<Comment[]>(this.postUrl+postId);
}
  createComment(comment:Comment,postId:number){
    this.http.post<Comment>(this.postUrl+postId,comment).subscribe();
  }
}
