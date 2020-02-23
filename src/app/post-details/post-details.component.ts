import { Component, OnInit, Input } from '@angular/core';
import {Post} from '../models/post';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  @Input() currentPost : Post;
  constructor() { }

  ngOnInit() {
  }

}
