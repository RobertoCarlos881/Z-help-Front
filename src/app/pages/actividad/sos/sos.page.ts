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
    const coordenadas = this.push.notification.additionalData.coordenadas;
    console.log("-------tipo de cordenas:",typeof coordenadas);
    console.log(coordenadas.length);
    console.log(coordenadas.lat);
    console.log(coordenadas);
    let color;
    if(this.push.notification.additionalData.coloricon === 'danger'){
      color = '#FF0000'
    }else{
      color = '#FFFF00'
    }
  
    // Verifica si las coordenadas representan un punto o una zona
    if (coordenadas.length === 4) {
      console.log("entro a 4 coodenadas----");
      let latSum = 0, lngSum = 0;
      for (const coord of coordenadas) {
        latSum += coord.lat;
        lngSum += coord.lng;
      }
      let center = { lat: latSum / coordenadas.length, lng: lngSum / coordenadas.length };
      let latlng = new google.maps.LatLng(center.lat, center.lng);
      let mapOptions = {
        center: latlng,
        zoom: 16, // The initial zoom level to be rendered by the map
        disableDefaultUI: false,
        clickableIcons: true
      };
      this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
  
      // Si es una zona, dibuja un polígono
      const poligono = new google.maps.Polygon({
        paths: coordenadas,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.35,
      });
      poligono.setMap(this.map);
    }else {
      console.log("entro a una coodenada----");
      let latlng = new google.maps.LatLng(coordenadas.lat, coordenadas.lng);
      let mapOptions = {
        center: latlng,
        zoom: 18, // The initial zoom level to be rendered by the map
        disableDefaultUI: false,
        clickableIcons: true
      };
      this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
      
      // Si es un punto, dibuja un círculo
      let circle = new google.maps.Circle({
        strokeColor: color, //amarillo: '#FFFF00' rojo:'#FF0000'
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.35,
        map: this.map,
        center: coordenadas,
        radius: 30 // Radio de 30 metros
      });
      circle.setMap(this.map);
  
    } 
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
