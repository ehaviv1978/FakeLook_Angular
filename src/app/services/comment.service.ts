import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentUrl;
  private commentLikeUrl;

  constructor(private http: HttpClient) { }

  getComments(postId: number): Observable<Comment[]> {
    this.setCommentURL(postId);
    console.log(this.commentUrl);
    return this.http.get<Comment[]>(this.commentUrl);
  }
  createComment(comment: Comment) {
    this.setCommentURL(comment.postId);
    this.http.post<Comment>(this.commentUrl, comment).subscribe();
  }
  setCommentURL(postId: number) {
    this.commentUrl = `http://localhost:8888/api/posts/${postId}/comments`;
  }
  setCommentLikeURL(commentId: number) {
    this.commentLikeUrl = `http://localhost:8888/api/posts/${commentId}/likes`;
  }

  addLike(commentId) {
    this.setCommentLikeURL(commentId)
    return this.http.get(this.commentLikeUrl).subscribe();
  }

  removeLike(commentId) {
    this.setCommentLikeURL(commentId)
    return this.http.delete(this.commentLikeUrl).subscribe();
  }
}
