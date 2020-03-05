import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postUrl;

  constructor(private http: HttpClient) { }
  getPosts(userId: number): Observable<Post[]> {
    this.setURL(userId);
    return this.http.get<Post[]>(this.postUrl)
      .pipe(map((Posts: Post[]) => {
        let myPosts = []
        Posts.map(Post => {
          Post.postLikes = { postId: Post.postId, postLikeAmount: Post.postLikeAmount, liked: Post.liked }
          delete(Post.postLikeAmount);
          delete(Post.liked);
          myPosts.push(Post);
        })
        return myPosts;
      }));
  }
  setURL(userId: number) {
    this.postUrl = `http://localhost:8888/api/posts/${userId}`;
  }
  addPost(post): Observable<Post[]> {
    this.postUrl = `http://localhost:8888/api/posts/`;

    return this.http.post<Post[]>(this.postUrl, post)
  }

  public currentPost: Post;
}
