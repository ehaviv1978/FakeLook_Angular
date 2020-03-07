import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapPostsComponent} from './map-posts/map-posts.component'
import { PostFeedComponent } from './post-feed/post-feed.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ChangeUserPictureComponent } from './change-user-picture/change-user-picture.component';
import { AllUsersComponent } from './all-users/all-users.component';


const routes: Routes = [
  {path: '', redirectTo: '/map', pathMatch: 'full'},
  {path: 'map',component: MapPostsComponent},
  {path: 'postFeed', component: PostFeedComponent},
  {path: 'post/:id', component: PostDetailsComponent},
  {path: 'newPost', component: NewPostComponent },
  //{path: 'postDetails', component:PostDetailsComponent},
  {path: 'changeUserPicture', component:ChangeUserPictureComponent},
  {path: 'search/:search', component: AllUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [  
  MapPostsComponent, 
  PostFeedComponent,
  NewPostComponent,
  PostDetailsComponent,
  ChangeUserPictureComponent,
  AllUsersComponent
];
