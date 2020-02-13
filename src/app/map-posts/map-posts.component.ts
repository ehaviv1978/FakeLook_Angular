import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
      console.log(this.lat)
      console.log(this.lng)
      this.mapInitializer();
    });
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    debugger
    this.marker.setMap(this.map);
  }
}