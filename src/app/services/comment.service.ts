import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentUrl;

  constructor(private http: HttpClient) { }

  getComments(postId: number, userId: number): Observable<Comment[]> {
    this.setURL(postId);
    console.log(this.commentUrl + "/" + userId);
    return this.http.get<Comment[]>(this.commentUrl + "/" + userId);
  }
  createComment(comment: Comment) {
    this.setURL(comment.postId);
    this.http.post<Comment>(this.commentUrl, comment).subscribe();
  }
  setURL(postId: number) {
    this.commentUrl = `http://localhost:8888/api/posts/${postId}/comments`;
  }

  addLike(userId, commentId) {
    console.log("add" + userId + commentId)
    return this.http.get(`http://localhost:8888/api/comments/${commentId}/${userId}`).subscribe();
  }

  removeLike(userId, commentId) {
    console.log("remove" + userId + commentId)
    return this.http.delete(`http://localhost:8888/api/comments/${commentId}/${userId}`).subscribe();
  }

  addCommentTag(commentId:number,tagContent:string): Observable<Comment[]> {
    this.commentUrl = `http://localhost:8888/api/commentTagAdd/${commentId}`;
    return this.http.post<Comment[]>(this.commentUrl, {"tagContent":tagContent})
  }

  removeCommentTag(commentId:number,tagContent:string): Observable<Comment[]> {
    this.commentUrl = `http://localhost:8888/api/commentTagRemove/${commentId}`;
    return this.http.post<Comment[]>(this.commentUrl, {"tagContent":tagContent})
  }
}
