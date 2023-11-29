import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-sos',
  templateUrl: './sos.page.html',
  styleUrls: ['./sos.page.scss'],
})
export class SOSPage implements OnInit {

  position = {
    lat: 19.504505115097537, //19.504505115097537, -99.14692399898082
    lng: -99.14692399898082,
  }
  @ViewChild('map')
  mapRef!: ElementRef;
  map: any;
  push: any;

  constructor(private route: ActivatedRoute) {}

  ionViewDidEnter(){
    this.createMap();
  }

  async createMap() {
    const position = this.position;
    let latlng = new google.maps.LatLng(position.lat, position.lng);
    let mapOptions = {
      center: latlng,
      zoom: 18, // The initial zoom level to be rendered by the map
      disableDefaultUI: false,
      clickableIcons: true
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
    //this.addMarker(position);
    //google.maps.event.addListenerOnce(this.map, 'tilesloaded', () => {
      //this.addMarker(position);
    //});

    // Crea un círculo rojo transparente y lo añade al mapa
  let circle = new google.maps.Circle({
    strokeColor: '#FFFF00', //amarillo: '#FFFF00' rojo:'#FF0000'
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FFFF00',
    fillOpacity: 0.35,
    map: this.map,
    center: latlng,
    radius: 20 // Radio de 20 metros
  });
  }

  ngOnInit() {
    console.log('------hola');
    this.route.queryParams.subscribe(params => {
      if (params && params['data']) {
        console.log(params['data']);
        this.push = JSON.parse(params['data']);
        
      }
    });   
  }

}
