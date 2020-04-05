import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import { User } from '../models/user';
import MarkerClusterer from "@google/markerclusterer"
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'map-posts',
  templateUrl: './map-posts.component.html',
  styleUrls: ['./map-posts.component.css']
})
export class MapPostsComponent implements AfterViewInit {
  faFilter = faFilter;
  user: User;
  users: User[];
  title = 'angular-gmap';
  @ViewChild('mapContainer', { static: true }) gmap: ElementRef;
  map: google.maps.Map;
  mapOptions: google.maps.MapOptions;
  marker: google.maps.Marker;
  posts: Post[];
  post: Post;
  imageurl: string;
  iconSize = 40;
  markers = [];
  markerClaster: MarkerClusterer;
  minLat = 0;
  maxLat = 0;
  minLong = 0;
  maxLong = 0;
  minDate = new Date(2000, 11, 24);
  maxDate = new Date();
  userId = 0;
  latGps = 0;
  longGps = 0;
  range = 200;
  circle = new google.maps.Circle();

  constructor(private postServ: PostService, private userServ: UserService, private router: Router) { }

  getMapBounds() {
    this.minLat = this.map.getBounds().toJSON().south
    this.maxLat = this.map.getBounds().toJSON().north
    this.minLong = this.map.getBounds().toJSON().west
    this.maxLong = this.map.getBounds().toJSON().east
  }

  async getMarkers() {
    await this.getMapBounds();
    this.postServ.getMapPosts(this.minLat, this.maxLat, this.minLong, this.maxLong, this.userId, this.minDate,
      this.maxDate, this.range, 'hi', this.latGps, this.longGps).subscribe(res => {
        this.posts = res;
        for (let post of this.posts) {
          let marker = new google.maps.Marker({
            position: new google.maps.LatLng(post.lat, post.long),
            icon: {
              url: post.userPic,
              scaledSize: new google.maps.Size(this.iconSize, this.iconSize)
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
          marker.addListener('click', async () => {
            this.router.navigate(['/post', post.postId]);
          });
          this.markers.push(marker);
        }
        this.showPosts();
      });
  }

  showPosts() {
    var options = {
      imagePath: 'http://localhost:4200/assets/images/m'
    };
    this.markerClaster = new MarkerClusterer(this.map, this.markers, options)
  }

  getCurrentLocation(callback) {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.latGps = pos.coords.latitude;
        this.longGps = pos.coords.longitude;
        let coordinates = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.mapOptions = {
          center: coordinates,
          zoom: 6,
          minZoom: 1
        };
        this.marker = new google.maps.Marker({
          position: coordinates,
          map: this.map,
          animation: google.maps.Animation.DROP,
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
    this.map.addListener('idle', () => {
      this.newFilter();
    });
    this.marker.setMap(this.map);
    this.getMarkers();
    this.drowCircle();
    this.circle.setEditable(false);
    this.circle.setDraggable(false);
  }

  drowCircle() {
    this.circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.1,
      map: this.map,
      center: this.map.getCenter(),
      radius: this.range * 1000 * 1.9,
    });
  }

  changeCircle() {
    this.latGps =this.map.getCenter().lat()
    this.longGps =this.map.getCenter().lng()
    this.circle.setCenter(this.map.getCenter());
    this.circle.setRadius(this.range * 1000);
  }

  async newFilter() {
    if (this.markers.length > 0) {
      this.markers = []
      this.markerClaster.clearMarkers();
    }
    this.getMarkers();
  }

  ngOnInit() {
    this.user = this.userServ.logedUser;
    this.userServ.getUsers().subscribe(res => {
      this.users = res;
    });
  }
}