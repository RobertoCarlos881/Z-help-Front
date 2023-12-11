import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { PopoverController } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/login/login.component';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-not-logged',
  templateUrl: './not-logged.page.html',
  styleUrls: ['./not-logged.page.scss'],
})
export class NotLoggedPage implements OnInit {

  /*positionzaca = {
    lat: 19.504391, //19.504505115097537, -99.14692399898082 ciclo:19.504391, -99.142385
    lng: -99.142385,
  }*/

  @ViewChild('map')
  mapRef!: ElementRef;
  //map: GoogleMap | undefined;
  map: any;
  marker: any;
  watchId: any;
  circle: any;
  newPosition: any;
  private storage: Storage | null = null;

  constructor(
    private popoverCtrl: PopoverController,
    private storageService: Storage
  ) {
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
      zoom: 18, // The initial zoom level to be rendered by the map
      disableDefaultUI: true,
      clickableIcons: true
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
    google.maps.event.addListenerOnce(this.map, 'tilesloaded', () => {
      this.addMarker(position);
    });
    /*new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      center: this.positionzaca,
      radius: 30,
      });*/
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
        radius: 30,
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
        radius: 30,
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
        url: '/assets/logo_perfil.png', // Cambia esto por la ruta a tu imagen
        scaledSize: new google.maps.Size(30, 33), // Cambia esto por el tamaño de tu imagen
      },
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
