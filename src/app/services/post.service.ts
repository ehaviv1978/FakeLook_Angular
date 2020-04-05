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

  getPost(userId: number, postId:number):Observable<Post[]> {
    this.postUrl = 'http://localhost:8888/api/post';
    return this.http.post<Post[]>(this.postUrl,{"userId": userId, "postId": postId})
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

  setURL(userId: number) {
    this.postUrl = `http://localhost:8888/api/userPosts/${userId}`;
  }

  addPost(post): Observable<Post[]> {
    this.postUrl = `http://localhost:8888/api/posts/`;
    return this.http.post<Post[]>(this.postUrl, post)
  }

  searchPosts(searchParam):Observable<Post[]>{
    this.postUrl = `http://localhost:8888/api/posts/`;
    return this.http.get<Post[]>(this.postUrl+searchParam)
  }

  addPostTag(postId:number,tagContent:string): Observable<Post[]> {
    this.postUrl = `http://localhost:8888/api/postTagAdd/${postId}`;
    return this.http.post<Post[]>(this.postUrl, {"tagContent":tagContent})
  }

  removePostTag(postId:number,tagContent:string): Observable<Post[]> {
    this.postUrl = `http://localhost:8888/api/postTagRemove/${postId}`;
    return this.http.post<Post[]>(this.postUrl, {"tagContent":tagContent})
  }

  getMapPosts(minLat:number,maxLat:number,minLong:number,maxLong:number,userId:number,
    minDate: Date, maxDate: Date, range: number, tag: string, latGps: number, longGps: number): Observable<Post[]> {
      console.log(latGps,longGps,range)
    this.postUrl = `http://localhost:8888/api/posts/getMapPosts/${minLat}/${maxLat}/${minLong}/
    ${maxLong}/${userId}/${minDate}/${maxDate}/${range}/${tag}/${latGps}/${longGps}`;
    return this.http.get<Post[]>(this.postUrl)
  }

}
