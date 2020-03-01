import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postUrl;

  constructor(private http: HttpClient) { }
  getPosts(userId:number): Observable<Post[]> {
    this.setURL(userId);
    return this.http.get<Post[]>(this.postUrl);   
}
setURL(userId:number){
 this.postUrl = `http://localhost:8888/api/posts/${userId}`
  }
  addPost(post): Observable<Post[]> {
    return this.http.post<Post[]>(this.postUrl, post);
  }
}
