import { Component, OnInit, Input } from '@angular/core';
import { PostLikes } from '../models/postLikes'
import { PostLikeService } from '../services/post-like.service';
import { faThumbsUp  }  from '@fortawesome/free-regular-svg-icons'
import {faThumbsUp as faThumbsUpFull}  from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-post-likes',
  templateUrl: './post-likes.component.html',
  styleUrls: ['./post-likes.component.css']
})
export class PostLikesComponent implements OnInit {
@Input() postLikes:PostLikes

constructor(private postLikeServ:PostLikeService) { }
faThumbsUp = faThumbsUp;
faThumbsUpFull = faThumbsUpFull;

likePost(){
  this.postLikeServ.addLike(this.postLikes)
  this.postLikes.liked=true;
  this.postLikes.postLikeAmount++;
}
dislikePost(){
this.postLikeServ.removeLike(this.postLikes)
this.postLikes.liked=false;
this.postLikes.postLikeAmount--;

}
  ngOnInit(): void {
  }

}
