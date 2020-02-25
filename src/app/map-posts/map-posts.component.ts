import { Component, AfterViewInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import { User } from '../models/user';
import  MarkerClusterer from "@google/markerclusterer"


@Component({
  selector: 'map-posts',
  templateUrl: './map-posts.component.html',
  styleUrls: ['./map-posts.component.css']
})
export class MapPostsComponent implements AfterViewInit {
  @Input() public parentData;
  user: User;
  title = 'angular-gmap';
  @ViewChild('mapContainer', { static: true }) gmap: ElementRef;
  map: google.maps.Map;
  mapOptions: google.maps.MapOptions;
  marker: google.maps.Marker;
  posts: Post[];
  post: Post;
  imageurl: SafeUrl;
  constructor(private postServ: PostService, private sanitizer: DomSanitizer) { }

  @Output() clickPostEvent = new EventEmitter<Post>();

  markers = [];
  async showPosts() {
    this.postServ.getPosts().subscribe(res => {
      this.posts = res;
      for (let post of this.posts) {
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(post.lat, post.long),
          map: this.map,
          icon: {
            url: post.userPic,
            scaledSize: new google.maps.Size(40, 40)
          }
        });
        let infowindow = new google.maps.InfoWindow({
          content: '<div><img width="200" src="' + post.picture + '"/><br>' + post.description + '</div>'
        });

        marker.addListener('mouseover', () => {
          infowindow.open(this.map, marker);
        });
        marker.addListener('mouseout', () => {
          infowindow.close();
        });
        marker.addListener('click', () => {
          this.clickPostEvent.emit(post);
        });

        this.markers.push(marker);

        marker.setMap(this.map);
      }

      var options = {
        imagePath: 'http://localhost:4200/assets/images/m'
      };
      new MarkerClusterer(this.map, this.markers, options)
    });
    
  }

  getCurrentLocation(callback) {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        let coordinates = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.mapOptions = {
          center: coordinates,
          zoom: 8
        };
        this.marker = new google.maps.Marker({
          position: coordinates,
          map: this.map,
          title: 'I\'m Here!',
          icon: {
            url: this.user.picture,
            scaledSize: new google.maps.Size(40, 40)
          }
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

  ngOnInit() {
    this.user = this.parentData;
  }
}