import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';
import { User } from '../models/user';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  @Input() public parentData :User;
  @Input() public currentPost: Post;
  comments: Comment[];
  tempComment:Comment;

  constructor(private commentServ: CommentService) {
   }

  ngOnInit() {
    this.getComments();
    this.createEmptyComment();
  }

  getComments() {
    this.commentServ.getComments(this.currentPost.postId).subscribe(data => {
      this.comments = data;
    });
  }

  addComment(){
    console.log(this.tempComment);
    this.tempComment.userId=this.parentData.userId;
    this.tempComment.postId=this.currentPost.postId;
    this.tempComment.firstName=this.parentData.firstName;
    this.tempComment.lastName=this.parentData.lastName;
    this.tempComment.picture=this.parentData.picture;
    this.tempComment.timeCommented = new Date();
    this.commentServ.createComment(this.tempComment,this.currentPost.postId)
    this.comments.unshift(this.tempComment);
    this.createEmptyComment();
  }
  createEmptyComment(){
    this.tempComment = new Comment()
  }
}
