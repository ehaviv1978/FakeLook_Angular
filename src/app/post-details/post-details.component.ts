import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';
import { User } from '../models/user';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { faThumbsUp  }  from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faThumbsUpFull } from '@fortawesome/free-solid-svg-icons'


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
  faThumbsUp = faThumbsUp;
  faThumbsUpFull = faThumbsUpFull;

  ngOnInit() {
    let postId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.postServ.getPost(this.userServ.logedUser.userId, postId).subscribe(data => {
      console.log(data[0]);
      this.currentPost = data[0];
      this.loggedInUser = this.userServ.logedUser;
      this.getComments();
      this.createEmptyComment();
    });
  }

  getComments() {
    this.commentServ.getComments(this.currentPost.postId, this.userServ.logedUser.userId).subscribe(data => {
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

  async dislikeComment(commentId){
    this.commentServ.removeLike(this.userServ.logedUser.userId,commentId)
  }
  
  async likeComment(commentId){
    this.commentServ.addLike(this.userServ.logedUser.userId,commentId)
  }

  addPostTag(event){
    this.postServ.addPostTag(this.currentPost.postId,event.value).subscribe(data => {
     console.log(data);
    });
  }

  removePostTag(event){
    if (event.value!=undefined){
      event=event.value
    }
    this.postServ.removePostTag(this.currentPost.postId,event).subscribe(data => {
      console.log(data);
     });
  }

  addCommentTag(commentId,event){
    this.commentServ.addCommentTag(commentId,event.value).subscribe(data => {
     console.log(data);
    });
  }

  removeCommentTag(commentId,event){
    if (event.value!=undefined){
      event=event.value
    }
    this.commentServ.removeCommentTag(commentId,event).subscribe(data => {
      console.log(data);
     });
  }
}
