import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postUrl = 'http://localhost:8888/api/posts/';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
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

  getPost(postId:number):Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl+postId)
    .pipe(map((Posts: Post[]) => {
      let post = []
      Posts.map(Post => {
        Post.postLikes = { postId: Post.postId, postLikeAmount: Post.postLikeAmount, liked: Post.liked }
        delete(Post.postLikeAmount);
        delete(Post.liked);
        post.push(Post);
      })
      return post;
    }));
  }

  addPost(post): Observable<Post[]> {
    return this.http.post<Post[]>(this.postUrl, post)
  }
}
