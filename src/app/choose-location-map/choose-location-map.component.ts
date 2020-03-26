import { Component,OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'

@Component({
  selector: 'app-choose-location-map',
  templateUrl: './choose-location-map.component.html',
  styleUrls: ['./choose-location-map.component.css']
})
export class ChooseLocationMapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  zoom = 12
  lat=0;
  long=0;
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    // zoomControl: false,
    // scrollwheel: false,
    disableDoubleClickZoom: true,
    // mapTypeId: 'hybrid',
    maxZoom: 15,
    minZoom: 2,
  }
  marker:any;
  infoContent = ''

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.lat = position.coords.latitude;
      this.long =position.coords.longitude;
      this.addMarker();
    })
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  click(event: google.maps.MouseEvent) {
    console.log(event.latLng.lat());
    this.lat = event.latLng.lat();
    this.long =event.latLng.lng();
    this.addMarker();
  }

  // logCenter() {
  //   console.log(JSON.stringify(this.map.getCenter()))
  // }

  addMarker() {
    this.marker ={
      position: {
        lat: this.lat,
        lng: this.long,
      },
      title: 'Post location ' ,
      info: 'This is my post location ' ,
      options: {
        draggable:true,
        animation: google.maps.Animation.DROP,
      },
    }
  }

  confirmPosition(){
    console.log('Hi');
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.info.open(marker)
  }
}