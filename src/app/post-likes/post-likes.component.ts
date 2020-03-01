import { Component, OnInit } from '@angular/core';
import {PostLikes} from '../models/postLikes'

@Component({
  selector: 'app-post-likes',
  templateUrl: './post-likes.component.html',
  styleUrls: ['./post-likes.component.css']
})
export class PostLikesComponent implements OnInit {
postLikes : PostLikes;

  constructor() { }

  ngOnInit(): void {
  }

}
