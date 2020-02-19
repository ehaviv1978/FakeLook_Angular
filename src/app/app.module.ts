import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MapPostsComponent } from './map-posts/map-posts.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { FormsModule } from '@angular/forms';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserLoginComponent } from './user-login/user-login.component';
import { NewPostComponent } from './new-post/new-post.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    MapPostsComponent,
    NavBarComponent,
    SideBarComponent,
    AllUsersComponent,
    AllPostsComponent,
    CreateAccountComponent,
    UserLoginComponent,
    NewPostComponent,
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
