import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';
import { User } from '../models/user';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  comments: Comment[];
  tempComment: Comment;
  currentPost: Post;
  loggedInUser: User;

  constructor(private commentServ: CommentService, private postServ: PostService,
    private userServ: UserService, private route: ActivatedRoute) { }

   ngOnInit() {
    let postId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.postServ.getPost(this.userServ.logedUser.userId, postId).subscribe(data => {
      this.currentPost = data[0];
      this.loggedInUser = this.userServ.logedUser;
      this.getComments();
      this.createEmptyComment();
    });
  }

  getComments() {
    this.commentServ.getComments(this.currentPost.postId).subscribe(data => {
      this.comments = data;
    });
  }

  addComment() {
    console.log(this.tempComment);
    this.tempComment.userId = this.loggedInUser.userId;
    this.tempComment.postId = this.currentPost.postId;
    this.tempComment.firstName = this.loggedInUser.firstName;
    this.tempComment.lastName = this.loggedInUser.lastName;
    this.tempComment.picture = this.loggedInUser.picture;
    this.tempComment.timeCommented = new Date();
    this.commentServ.createComment(this.tempComment);
    this.comments.unshift(this.tempComment);
    this.createEmptyComment();
  }

  createEmptyComment() {
    this.tempComment = new Comment()
  }
}
