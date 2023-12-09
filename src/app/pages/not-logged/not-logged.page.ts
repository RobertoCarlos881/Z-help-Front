import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { PopoverController } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/login/login.component';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-not-logged',
  templateUrl: './not-logged.page.html',
  styleUrls: ['./not-logged.page.scss'],
})
export class NotLoggedPage implements OnInit {

  position = {
    lat: 19.504505115097537, //19.504505115097537, -99.14692399898082
    lng: -99.14692399898082,
  }

  @ViewChild('map')
  mapRef!: ElementRef;
  //map: GoogleMap | undefined;
  map: any;
  marker: any;
  watchId: any;
  circle: any;
  newPosition: any;

  constructor(
    private popoverCtrl: PopoverController
  ) { }

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

  async presentPopover() {
    const popover = await this.popoverCtrl.create({
      component: LoginComponent,
      cssClass: 'contact-popover',
      translucent: false
    });
  
    await popover.present();
  }

  async mylocation() {
    console.log('ubicación------------:', this.newPosition);
  this.addMarker(this.newPosition);
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates;
  }

}
