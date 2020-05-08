import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  //  private commentUrl ="http://host.docker.internal:8888/api/comments";
  private commentUrl ="http://localhost:8888/api/comments";

  constructor(private http: HttpClient) { }

  getComments(postId: number, userId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentUrl + "/getPostComments/"+ postId + "/" + userId);
  }

  createComment(comment: Comment) {
    this.http.post<Comment>(this.commentUrl + "/addComment/" + comment.postId, comment).subscribe();
  }
 
  addLike(userId, commentId) {
    return this.http.get(this.commentUrl + `/addLike/${commentId}/${userId}`).subscribe();
  }

  removeLike(userId, commentId) {
    return this.http.delete(this.commentUrl + `/removeLike/${commentId}/${userId}`).subscribe();
  }

  addCommentTag(commentId:number,tagContent:string): Observable<Comment[]> {
    return this.http.post<Comment[]>(this.commentUrl + `/tag/add/${commentId}`, {"tagContent":tagContent})
  }

  removeCommentTag(commentId:number,tagContent:string): Observable<Comment[]> {
    return this.http.post<Comment[]>(this.commentUrl + `/tag/remove/${commentId}`, {"tagContent":tagContent})
  }
}
