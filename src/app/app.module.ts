import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapPostsComponent } from './map-posts/map-posts.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { FormsModule} from '@angular/forms';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewPostComponent } from './new-post/new-post.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeUserPictureComponent } from './change-user-picture/change-user-picture.component';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostLikesComponent } from './post-likes/post-likes.component';
import { LogInComponent } from './log-in/log-in.component';

@NgModule({
  declarations: [
    AppComponent,
    MapPostsComponent,
    NavBarComponent,
    SideBarComponent,
    AllUsersComponent,
    AllPostsComponent,
    CreateAccountComponent,
    NewPostComponent,
    ChangeUserPictureComponent,
    PostFeedComponent,
    PostDetailsComponent,
    PostLikesComponent,
    LogInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NoopAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
