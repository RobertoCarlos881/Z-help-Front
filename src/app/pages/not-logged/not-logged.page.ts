import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { PopoverController } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/login/login.component';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { Storage } from '@ionic/storage-angular';
import { RegistroPage } from '../registro/registro.page';
import { Router } from '@angular/router';
import { EndpointService } from 'src/app/services/endpoint.service';
import { interval, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-not-logged',
  templateUrl: './not-logged.page.html',
  styleUrls: ['./not-logged.page.scss'],
})
export class NotLoggedPage implements OnInit {
  private router = inject(Router);
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
    private storageService: Storage,
    private endpointService: EndpointService
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
        this.addMarker(this.newPosition);
        // Guarda la ubicación en el almacenamiento local
        await this.storage?.set('ubicacion', { actual: this.newPosition });
      }
    });

    this.actualizarZonas();

    interval(1000).pipe(
        startWith(0),
        switchMap(() => this.actualizarZonas())
      )
      .subscribe();

      interval(30000).pipe(
        startWith(0),
        switchMap(() => this.createMap())
      )
      .subscribe();
  }

  async actualizarZonas() {
    type DatosCombinadosItem = {
      fechaCreacion: Date; // O el tipo de dato correcto para 'creado'
      lat: number;       // O el tipo de dato correcto para 'latitud'
      lng: number;      // O el tipo de dato correcto para 'longitud'
    };

    try {
      let zonas = await this.endpointService.getActivitiesAll();
      if (zonas && Array.isArray(zonas)) {
        let sos: DatosCombinadosItem[] = [];
        let rep: DatosCombinadosItem[] = [];

        zonas.forEach(item => {
          if (item && item.accion === true) {
            const lat = parseFloat(item.latitud);
            const lng = parseFloat(item.longitud);
            const datos: DatosCombinadosItem = {
              fechaCreacion: item.creado,
              lat: lat,
              lng: lng
            }
            sos.push(datos);
          }
          if (item && item.accion === false) {
            const lat = parseFloat(item.latitud);
            const lng = parseFloat(item.longitud);
            const datos: DatosCombinadosItem = {
              fechaCreacion: item.creado,
              lat: lat,
              lng: lng
            }
            rep.push(datos);
          }
        });

        await this.storage?.set('puntoSOS', sos);
        await this.storage?.set('puntoREP', rep);
      } else {
        console.log('No se encontraron datos válidos en la respuesta.');
      }
    } catch (error) {
      console.error('Error al obtener las actividades:', error);
    }
  }

  ionViewDidEnter() {
    this.createMap();

  }
  ionViewDidLeave() {
    if (this.watchId) Geolocation.clearWatch({ id: this.watchId });
  }

  async createMap() {
    // Intenta obtener la ubicación del almacenamiento
    let position = await this.storage?.get('ubicacion');
    // Si no hay una ubicación guardada, obtén la ubicación actual
    if (!position) {
      position = await this.getCurrentPosition();
      this.newPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    } else {
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
    //this.addMarker(this.newPosition);
    google.maps.event.addListenerOnce(this.map, 'tilesloaded', () => {
      this.addMarker(this.newPosition);
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

  addMarker(position: any): void {
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

  button() {
    this.router.navigateByUrl('/registro')
  }

  async presentPopover() {
    const popover = await this.popoverCtrl.create({
      component: LoginComponent,
      cssClass: 'contact-popover',
      translucent: false
    });

    await popover.present();
    //await this.popoverCtrl.dismiss();
  }

  async mylocation() {
    this.addMarker(this.newPosition);
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates;
  }

  Ayuda() {
    const numbers: string[] = ["+52 1 221 943 0106"];
    const whatsappUrl = `whatsapp://send?phone=${numbers}&text=Hola, necesito ayuda con mi aplicación Z-Help.`;
    window.open(whatsappUrl, '_system');
  }

}
