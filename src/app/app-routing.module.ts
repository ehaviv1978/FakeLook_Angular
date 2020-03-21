import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapPostsComponent} from './map-posts/map-posts.component'
import { PostFeedComponent } from './post-feed/post-feed.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ChangeUserPictureComponent } from './change-user-picture/change-user-picture.component';
import { SearchComponent } from './search/search.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LogInComponent } from './log-in/log-in.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: '', redirectTo: '/logIn', pathMatch: 'full'},
  // {path: '', component: AppComponent},
  {path: 'logIn', component: LogInComponent},
  {path: 'createAccount', component: CreateAccountComponent},
  {path: 'map',component: MapPostsComponent},
  {path: 'postFeed', component: PostFeedComponent},
  {path: 'post/:id', component: PostDetailsComponent},
  {path: 'newPost', component: NewPostComponent },
  //{path: 'postDetails', component:PostDetailsComponent},
  {path: 'changeUserPicture', component:ChangeUserPictureComponent},
  {path: 'search/:search', component: SearchComponent},
  {path: 'user/:id', component: UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [  
  LogInComponent,
  CreateAccountComponent,
  MapPostsComponent, 
  PostFeedComponent,
  NewPostComponent,
  PostDetailsComponent,
  ChangeUserPictureComponent,
  SearchComponent,
  UserDetailsComponent,
  AppComponent
];
