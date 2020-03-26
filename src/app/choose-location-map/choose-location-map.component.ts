import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-location-map',
  templateUrl: './choose-location-map.component.html',
  styleUrls: ['./choose-location-map.component.css']
})
export class ChooseLocationMapComponent implements OnInit {
  // title = 'angular-gmap';
  // map: google.maps.Map;
  // mapOptions: google.maps.MapOptions;
  // marker: google.maps.Marker;
  lat: number;
  long: number;
  // coordinate: google.maps.LatLng;

  constructor() { }

  // getCurrentLocation(callback) {
  //   if (navigator) {
  //     navigator.geolocation.getCurrentPosition(pos => {
  //       this.lat = pos.coords.latitude;
  //       this.long = pos.coords.longitude;
  //       let coordinates = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
  //       this.mapOptions = {
  //         center: coordinates,
  //         zoom: 8,
  //         minZoom: 1.7
  //       };
  //       this.marker = new google.maps.Marker({
  //         position: coordinates,
  //         map: this.map,
  //         animation: google.maps.Animation.DROP,
  //         title: 'I\'m Here!',
  //         draggable: true
  //       });
  //       callback();
  //     });
  //   }
  // }

  // ngAfterViewInit() {
  //   this.getCurrentLocation(() => {
  //     this.mapInitializer();
  //   });
  // }

  // mapInitializer() {
  //   this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
  //   this.marker.setMap(this.map);
    // this.map.addListener('click', function (event) {
    //   //Get the location that the user clicked.
    //   let coordinates = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());

    //   console.log(coordinates);
    //   console.log(event.latLng);
    //   console.log(event.latLng.lat());

      
      
    // });
  // }

  // click(event: google.maps.MouseEvent) {
  //   console.log(event)
  // }

  // getPosition(){
  //   console.log('hi');
  // }

  ngOnInit() {
    
  }
}