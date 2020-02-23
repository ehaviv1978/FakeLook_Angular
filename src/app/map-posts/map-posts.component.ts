import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import {Post} from'../models/post';
import {PostService} from '../services/post.service';


@Component({
  selector: 'map-posts',
  templateUrl: './map-posts.component.html',
  styleUrls: ['./map-posts.component.css']
})
export class MapPostsComponent implements AfterViewInit {
  title = 'angular-gmap';
  @ViewChild('mapContainer',{static: true}) gmap: ElementRef;
  map: google.maps.Map;
  coordinates:google.maps.LatLng;
  mapOptions:google.maps.MapOptions;
  marker:google.maps.Marker;
  posts: Post[];
  post: Post;
  imageurl:SafeUrl;
  constructor(private postServ: PostService, private sanitizer: DomSanitizer) { }

  async showPosts() {
    this.postServ.getPosts().subscribe( res => {
      this.posts =  res;
      for (let post of this.posts) {
        this.coordinates =  new google.maps.LatLng(post.lat, post.long);
        this.marker =  new google.maps.Marker({
          position: this.coordinates,
            map: this.map,
            title: post.description
          });
           this.marker.setMap(this.map);
      }
    });
  }

  getCurrentLocation(callback) {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.coordinates = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.mapOptions = {
          center: this.coordinates,
          zoom: 8
        };
        this.marker = new google.maps.Marker({
          position: this.coordinates,
          map: this.map,
          title: 'I\'m Here!'
        });
        callback();
      });
    }
  }

  ngAfterViewInit() {
    this.getCurrentLocation(() => {
      this.mapInitializer();
    });
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
    this.showPosts();
  }
}