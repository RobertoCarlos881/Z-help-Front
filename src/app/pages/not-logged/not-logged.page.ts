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

  @Input() position = {
    lat: 19.50669906783151, //19.50669906783151, -99.14546198302546
    lng: -99.14546198302546,
  }

  @ViewChild('map')
  mapRef!: ElementRef;
  //map: GoogleMap | undefined;
  map: any;
  marker: any;

  constructor(
    private popoverCtrl: PopoverController
  ) { }

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

    /* this.map = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: this.mapRef.nativeElement, // reference to the capacitor-google-map element
      apiKey: environment.mapskey, // Your Google Maps API Key
      config: {
    center: {
      // The initial position to be rendered by the map
      lat: latlng.lat, //19.50669906783151, -99.14546198302546
      lng: latlng.lng,
    },
    zoom: 15, // The initial zoom level to be rendered by the map
    disableDefaultUI: true,
    clickableIcons: true
  },
    })*/
  }

  addMarker(position: any): void{
    //let latlng = new google.maps.LatLng(position.lat, position.lng);

    //this.marker.setPosition(latlng);
    this.map.panTo(position);
   // this.positionSet = position;
    

  }

  ngOnInit() {
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
