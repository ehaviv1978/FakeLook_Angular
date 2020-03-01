import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postUrl = 'http://localhost:8888/api/posts'

  constructor(private http: HttpClient) { }
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }
  addPost(post): Observable<Post[]> {
    return this.http.post<Post[]>(this.postUrl, post);
  }
}
