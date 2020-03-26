import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-choose-location-map',
  templateUrl: './choose-location-map.component.html',
  styleUrls: ['./choose-location-map.component.css']
})
export class ChooseLocationMapComponent implements AfterViewInit {
  title = 'angular-gmap';
  @ViewChild('mapContainer', { static: true }) gmap: ElementRef;
  map: google.maps.Map;
  mapOptions: google.maps.MapOptions;
  marker: google.maps.Marker;
  lat: number;
  long: number;

  constructor() { }

  getCurrentLocation(callback) {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude;
        this.long = pos.coords.longitude;
        let coordinates = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.mapOptions = {
          center: coordinates,
          zoom: 8,
          minZoom: 1.7
        };
        this.marker = new google.maps.Marker({
          position: coordinates,
          map: this.map,
          animation: google.maps.Animation.DROP,
          title: 'I\'m Here!',
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
    google.maps.event.addListener(this.map, 'click', function (event) {
      //Get the location that the user clicked.
      let coordinates = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());

      console.log(event.latLng.lat());
      console.log(event.latLng.lng());

    
    });
  }

  ngOnInit() {
  }
}