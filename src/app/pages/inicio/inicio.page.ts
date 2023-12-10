import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild('map')
  mapRef!: ElementRef;
  map: any;
  marker: any;
  circle: any;
  watchId: any;
  newPosition: any;
  private storage: Storage | null = null;

  constructor(private toastController: ToastController, 
              private storageService: Storage) {
    this.init();
   }

  async init() {
    const storage = await this.storageService.create();
    this.storage = storage;
  }

  
  async ngOnInit() {
        // Inicia el seguimiento continuo
    this.watchId = Geolocation.watchPosition({ enableHighAccuracy: true }, async (position, err) => {
    if (position) {
      this.newPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      console.log('ubicación actualizada:', this.newPosition);
      this.addMarker(this.newPosition);
      // Guarda la ubicación en el almacenamiento local
      await this.storage?.set('ubicacion', { actual: this.newPosition });
      }
    });
  }

  ionViewDidEnter(){
    this.createMap();
  }
  ionViewDidLeave(){
    if(this.watchId) Geolocation.clearWatch({ id: this.watchId });
  }

  async createMap() {
    // Intenta obtener la ubicación del almacenamiento
  let position = await this.storage?.get('ubicacion');
  console.log("storage:", position);
  // Si no hay una ubicación guardada, obtén la ubicación actual
  if (!position.actual) {
    position = await this.getCurrentPosition();
    console.log("ubicacion actual no encotrada en el storage");
    this.newPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  }else{
    console.log("ubicacion actual encotrada en el storage");
    this.newPosition = {
      lat: position.actual.lat,
      lng: position.actual.lng,
    };
  }
  
    let latlng = new google.maps.LatLng(this.newPosition.lat, this.newPosition.lng);
    let mapOptions = {
      center: latlng,
      zoom: 18,
      disableDefaultUI: true,
      clickableIcons: true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
    google.maps.event.addListenerOnce(this.map, 'tilesloaded', () => {
      this.addMarker(position);
    });
    
  // Obtiene los puntos de 'puntoSOS' y 'puntoREP' del almacenamiento
  const puntoSOS = await this.storage?.get('puntoSOS');
  const puntoREP = await this.storage?.get('puntoREP');

  console.log('ubicaciones rep:', puntoREP);
  console.log('ubicaciones SOS:', puntoSOS);
  // Dibuja círculos en las ubicaciones de 'puntoSOS'
  if (puntoSOS) {
    for (const point of puntoSOS) {
      new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this.map,
        center: point,
        radius: 15,
        });
      }
    }

  // Dibuja círculos en las ubicaciones de 'puntoREP'
  if (puntoREP) {
    for (const point of puntoREP) {
      new google.maps.Circle({
        strokeColor: '#FFFF00',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FFFF00',
        fillOpacity: 0.35,
        map: this.map,
        center: point,
        radius: 15,
        });
      }
    }
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
        url: '/assets/logo_perfil.png',
        scaledSize: new google.maps.Size(30, 33),
      },
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

  async BotonREP() {
    this.presentToast();
    const currentPosition = this.newPosition;
    console.log('ubicación reporte:', currentPosition);
    // Obtiene la lista de ubicaciones de 'puntoREP'
    let puntoREP = await this.storage?.get('puntoREP');
    if (!puntoREP) {
      puntoREP = [];
    }
    // Añade la ubicación actual a la lista
    puntoREP.push(currentPosition);
    // Guarda la lista actualizada
    await this.storage?.set('puntoREP', puntoREP);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: '<h1>ZONA REPORTADA</h1>',///assets/alarma.gif
      duration: 2500,
      position: 'middle',
      color: 'warning',
      animated: true,
      cssClass: 'toast-message',
      icon: "warning-outline"
    });
    await toast.present();
  }
}
