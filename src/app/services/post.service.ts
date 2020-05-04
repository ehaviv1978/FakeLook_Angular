import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
//  private postUrl = 'http://host.docker.internal:8888/api/posts/';
  private postUrl = 'http://localhost:8888/api/posts';

  constructor(private http: HttpClient) { }

  getPosts(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl + "/" + userId)
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
    return this.http.get<Post[]>(this.postUrl + "/" + userId +"/" + postId)
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

  searchPosts(searchParam):Observable<Post[]>{
    return this.http.get<Post[]>(this.postUrl + "Search/" +searchParam)
  }

  addPostTag(postId:number,tagContent:string): Observable<Post[]> {
    return this.http.post<Post[]>(this.postUrl + "/addTag/" + postId, {"tagContent":tagContent})
  }

  removePostTag(postId:number,tagContent:string): Observable<Post[]> {
    return this.http.post<Post[]>(this.postUrl + "/removeTag/" + postId, {"tagContent":tagContent})
  }

  getMapPosts(minLat:number,maxLat:number,minLong:number,maxLong:number,userId:number,
    minDate: Date, maxDate: Date, range: number, tag: string, latGps: number, longGps: number): Observable<Post[]> {
      if (tag ==''){
        tag='~~~~'
      }
    let tempUrl = this.postUrl +`/getMapPosts/${minLat}/${maxLat}/${minLong}/
    ${maxLong}/${userId}/${minDate}/${maxDate}/${range}/${tag}/${latGps}/${longGps}`;
    return this.http.get<Post[]>(tempUrl)
  }
}
