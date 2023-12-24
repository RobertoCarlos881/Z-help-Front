import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

import { PopoverController } from '@ionic/angular';
import { UbicacionComponent } from 'src/app/components/publicacion/ubicacion/ubicacion.component';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {
  position = {
    lat: 19.504505115097537, //19.504505115097537, -99.14692399898082
    lng: -99.14692399898082,
  }

  /*@ViewChild('map')
  map: any;
  mapRef!: ElementRef;*/
  @ViewChild('map', { static: false }) mapRef!: ElementRef;
  map: any;
  ubicacion: any;

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }
  /*ngAfterViewInit(){
    this.createMap();
  }*/
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

  async presentPopover() {
    const popover = await this.popoverCtrl.create({
      component: UbicacionComponent,
      cssClass: 'contact-popover',
      mode: 'ios',
      translucent: false
    });
  
    await popover.present();
    await popover.present();

  const { data } = await popover.onWillDismiss();
  if (data) {
    this.ubicacion = data;//esta la ubicacion que eligio el usuario, es null por defecto si no selecciona nada
    console.log(this.ubicacion);
  }
  }

}
