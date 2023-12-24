import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss'],
})
export class UbicacionComponent implements OnInit {

  position = {
    lat: 19.504505115097537, //19.504505115097537, -99.14692399898082
    lng: -99.14692399898082,
  }

  @ViewChild('map', { static: false }) mapRef!: ElementRef;
  map: any;
  ubicacion: any;

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  ionViewDidEnter(){
    this.createMap();
  }

  async createMap() {
    const position = this.position;
    let latlng = new google.maps.LatLng(position.lat, position.lng);
    let mapOptions = {
      center: latlng,
      zoom: 18, // The initial zoom level to be rendered by the map
      disableDefaultUI: true,
      clickableIcons: true
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
    //this.addMarker(position);
    /*google.maps.event.addListenerOnce(this.map, 'tilesloaded', () => {
      this.addMarker(position);
    });*/
  }

  marcarUbicacion() {
    const center = this.map.getCenter();
    this.ubicacion = {
      lat: center.lat(),
      lng: center.lng()
    };
    console.log(this.ubicacion);
    this.cerrarPopover(this.ubicacion);
  }

  async cerrarPopover(ubicacion: any = null) {
    await this.popoverCtrl.dismiss(ubicacion);
  }

}

