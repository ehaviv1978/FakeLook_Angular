import { Component,OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'

@Component({
  selector: 'app-choose-location-map',
  templateUrl: './choose-location-map.component.html',
  styleUrls: ['./choose-location-map.component.css']
})
export class ChooseLocationMapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow
  @Output() public childEvent = new EventEmitter();

  zoom = 12;
  lat=0;
  long=0;
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 2,
  }
  marker:any;
  infoContent = '';

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

  click(event: google.maps.MouseEvent) {
    this.lat = event.latLng.lat();
    this.long =event.latLng.lng();
    this.addMarker();
  }

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
    this.childEvent.emit({
      "lat":this.lat,
      "long":this.long,
      "map":false,
      "changed":true
    })
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.info.open(marker)
  }
}