import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  position = {
    lat: 19.504505115097537, //19.504505115097537, -99.14692399898082
    lng: -99.14692399898082,
  }

  @ViewChild('map')
  mapRef!: ElementRef;
  map: any;
  marker: any;
  circle: any;
  watchId: any;
  newPosition: any;

  constructor() { }

  ionViewDidEnter(){
    this.createMap();
  }
  ionViewDidLeave(){
    if(this.watchId) Geolocation.clearWatch({ id: this.watchId });
  }

  async createMap() {
    const position = this.newPosition;
    let latlng = new google.maps.LatLng(position.lat, position.lng);
    let mapOptions = {
      center: latlng,
      zoom: 18, // The initial zoom level to be rendered by the map
      disableDefaultUI: true,
      clickableIcons: true
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
    //this.addMarker(position);
    google.maps.event.addListenerOnce(this.map, 'tilesloaded', () => {
      this.addMarker(position);
    });
  }

  addMarker(position: any): void{
    this.map.panTo(position);
    this.map.setZoom(18);
    if (this.marker) {
      this.marker.setMap(null); // Elimina el marcador anterior
    }
    this.marker = new google.maps.Marker({
      position: position,
      map: this.map,
      icon: {
        url: '/assets/logo_perfil.png', // Cambia esto por la ruta a tu imagen
        scaledSize: new google.maps.Size(30, 33), // Cambia esto por el tamaño de tu imagen
      },
    });
  }

  async ngOnInit() {
    const position = await this.getCurrentPosition();
    this.newPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

   // Inicia el seguimiento continuo de la ubicación del usuario
   this.watchId = Geolocation.watchPosition({ enableHighAccuracy: true }, (position, err) => {
    if (position) {
      this.newPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      
      console.log('ubicación:', this.newPosition);
      this.addMarker(this.newPosition);
    }
  });
  }

  async mylocation() {  
  console.log('ubicación------------:', this.newPosition);
  this.addMarker(this.newPosition);
  }
  
  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      return coordinates;
    } catch (error) {
      console.error('Error obteniendo la posición:', error);
      throw error;
    }
  }
}
