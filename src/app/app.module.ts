import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MapPostsComponent } from './map-posts/map-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    MenuBarComponent,
    MapPostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
