import { Component, OnInit} from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  users: User[] =[];
  posts: Post[] =[];
  searchString: string ="";

  constructor(private postServ: PostService, private userServ: UserService, private route: ActivatedRoute, private router: Router) { }

  // getUsers() {
  //   this.userServ.getUsers().subscribe(res => {
  //     this.users = res;
  //   });
  // }

  searchUsers(str:string) {
    this.userServ.searchUsers(str).subscribe(res => {
      this.users = res;
    });
  }

  searchPosts(str:string){
    this.postServ.searchPosts(str).subscribe(res =>{
      this.posts = res;
    });
  }

  async showUserDetail(user: User) {
    this.router.navigate(['/user', user.userId]);
 }

 async showPostDetail(post: Post) {
  this.router.navigate(['/post', post.postId]);
}

  // userSearch(str:string){
  //   if (str==null){
  //     this.getUsers();
  //   }else{
  //     this.searchUsers(str)
  //   }
  // }

  async ngOnInit() {
    this.route.params.subscribe(
      params => {
        const str = params['search'];
        //this.userSearch(str);
         if (str!=""){
          this.searchUsers(str);
          this.searchPosts(str);
         }else
         {
           this.users=[];
           this.posts=[];
         }
      }
    );
  }

}
