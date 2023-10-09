import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @Input() position = {
    lat: 19.50669906783151, //19.50669906783151, -99.14546198302546
    lng: -99.14546198302546,
  }

  @ViewChild('map')
  mapRef!: ElementRef;
  map: any;
  marker: any;


  constructor() { }

  ionViewDidEnter(){
    this.createMap();

  }

  async createMap() {

    const position = this.position;

    let latlng = new google.maps.LatLng(position.lat, position.lng);

    let mapOptions = {
      center: latlng,
      zoom: 15, // The initial zoom level to be rendered by the map
      disableDefaultUI: true,
      clickableIcons: true
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);

    this.addMarker(position);

  }

  addMarker(position: any): void{
    //let latlng = new google.maps.LatLng(position.lat, position.lng);

    //this.marker.setPosition(latlng);
    this.map.panTo(position);
   // this.positionSet = position;
    

  }

  ngOnInit() {
  }

  async mylocation() {
    Geolocation.getCurrentPosition().then((res) => {

      console.log('mylocation() -> get', res)

      const position = {
        lat: res.coords.latitude,
        lng: res.coords.longitude,
        
      }
      this.addMarker(position);


    })
  }
  

 

}
