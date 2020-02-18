import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'map-posts',
  templateUrl: './map-posts.component.html',
  styleUrls: ['./map-posts.component.css']
})
export class MapPostsComponent implements AfterViewInit {
  title = 'angular-gmap';
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat: any;
  lng: any;
  coordinates:google.maps.LatLng;
  mapOptions:google.maps.MapOptions;
  marker:google.maps.Marker;
  posts: any =[];
  post: any;
  img:any;
  imageurl:SafeUrl;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  async showPosts() {
    this.http.get('http://localhost:8888/api/Posts').subscribe(async res => {
      this.posts = await res;
      console.log(this.posts[0]);
      for (var post of this.posts) {
        this.lng = await post.Long;
        console.log(this.lng);
        this.lat = await post.Lat;
        this.coordinates = await new google.maps.LatLng(this.lat, this.lng);
        this.marker = await new google.maps.Marker({
          position: this.coordinates,
            map: this.map,
            title: post.Description
          });
          await this.marker.setMap(this.map);
      }
    });
  }

  getCurrentLocation(callback) {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = pos.coords.longitude;
        this.lat = pos.coords.latitude;
        this.coordinates = new google.maps.LatLng(this.lat, this.lng);
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