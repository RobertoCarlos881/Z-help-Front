import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { PushService } from 'src/app/services/push.service';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { EndpointService } from 'src/app/services/endpoint.service';

interface Zona {
  [key: string]: { lat: number, lng: number }[];
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  private router = inject(Router);

  @ViewChild('map')
  mapRef!: ElementRef;
  map: any;
  marker: any;
  circle: any;
  watchId: any;
  newPosition: any;
  private storage: Storage | null = null;
  ultimaZona: string | null = null;
  ultimoPuntoSOS: { lat: number, lng: number } = { lat: 0, lng: 0 };
  ultimoPuntoREP: { lat: number, lng: number } = { lat: 0, lng: 0 };
  zonas: Zona = {
    ESCOM: [{ lat: 19.503906, lng: -99.148073 }, { lat: 19.503214, lng: -99.146445 }, { lat: 19.505264, lng: -99.145426 }, { lat: 19.505893, lng: -99.147058 }],
    CIC: [{ lat: 19.502967, lng: -99.147989 }, { lat: 19.502775, lng: -99.147487 }, { lat: 19.503397, lng: -99.147183 }, { lat: 19.503614, lng: -99.147697 }],
    CIDETEC: [{ lat: 19.502738, lng: -99.147165 }, { lat: 19.502651, lng: -99.146899 }, { lat: 19.503086, lng: -99.146664 }, { lat: 19.503182, lng: -99.146932 }],
    DAE: [{ lat: 19.496729, lng: -99.133974 }, { lat: 19.496531, lng: -99.132928 }, { lat: 19.497330, lng: -99.132698 }, { lat: 19.497487, lng: -99.133891 }],
    BIBLIOTECA: [{ lat: 19.495568, lng: -99.134114 }, { lat: 19.495433, lng: -99.133349 }, { lat: 19.496564, lng: -99.133227 }, { lat: 19.496654, lng: -99.133894 }],
    ESIME: [{ lat: 19.496842, lng: -99.135954 }, { lat: 19.496650, lng: -99.134769 }, { lat: 19.500382, lng: -99.134039 }, { lat: 19.500594, lng: -99.135230 }],
    ESIQIE: [{ lat: 19.500594, lng: -99.135235 }, { lat: 19.500392, lng: -99.134034 }, { lat: 19.502298, lng: -99.133669 }, { lat: 19.502511, lng: -99.134860 }],
    ESFM: [{ lat: 19.502561, lng: -99.134844 }, { lat: 19.502329, lng: -99.133674 }, { lat: 19.503016, lng: -99.133524 }, { lat: 19.503224, lng: -99.134726 }],
    LABS_ESFM: [{ lat: 19.501029, lng: -99.133310 }, { lat: 19.500872, lng: -99.132500 }, { lat: 19.502678, lng: -99.132231 }, { lat: 19.502784, lng: -99.132977 }],
    ESIT: [{ lat: 19.500028, lng: -99.133352 }, { lat: 19.499932, lng: -99.132832 }, { lat: 19.500791, lng: -99.132687 }, { lat: 19.500893, lng: -99.133197 }],
    CENTRO_CULTURAL_JTB: [{ lat: 19.495917, lng: -99.136134 }, { lat: 19.495713, lng: -99.134839 }, { lat: 19.496495, lng: -99.134722 }, { lat: 19.496714, lng: -99.135813 }],
    PLAZA_ROJA: [{ lat: 19.495817, lng: -99.134776 }, { lat: 19.495748, lng: -99.134313 }, { lat: 19.496401, lng: -99.134173 }, { lat: 19.496470, lng: -99.134712 }],
    CAP: [{ lat: 19.495590, lng: -99.134102 }, { lat: 19.495462, lng: -99.133371 }, { lat: 19.496470, lng: -99.133191 }, { lat: 19.496589, lng: -99.133901 }],
    PLANETARIO: [{ lat: 19.496125, lng: -99.140022 }, { lat: 19.496002, lng: -99.139431 }, { lat: 19.496959, lng: -99.139120 }, { lat: 19.497031, lng: -99.139682 }],
    ENCB: [{ lat: 19.499170, lng: -99.146803 }, { lat: 19.498323, lng: -99.144723 }, { lat: 19.501003, lng: -99.143211 }, { lat: 19.501913, lng: -99.145507 }],
    ZONA_DEPORTIVA: [{ lat: 19.497499, lng: -99.140249 }, { lat: 19.496939, lng: -99.137053 }, { lat: 19.503566, lng: -99.135776 }, { lat: 19.504098, lng: -99.138951 }],
    ESIA: [{ lat: 19.503586, lng: -99.134042 }, { lat: 19.504471, lng: -99.138908 }, { lat: 19.506003, lng: -99.138559 }, { lat: 19.505477, lng: -99.133935 }],
    CICLOPISTA: [{ lat: 19.499537, lng: -99.140256 }, { lat: 19.504187, lng: -99.139346 }, { lat: 19.505023, lng: -99.144711 }, { lat: 19.501144, lng: -99.145621 }],
    UPIEM: [{ lat: 19.497953, lng: -99.143333 }, { lat: 19.497782, lng: -99.142863 }, { lat: 19.498502, lng: -99.142501 }, { lat: 19.498733, lng: -99.142951 }],
    CNMN_IPN: [{ lat: 19.498909, lng: -99.141846 }, { lat: 19.498558, lng: -99.141176 }, { lat: 19.499072, lng: -99.140877 }, { lat: 19.499246, lng: -99.141426 }],
    SECRETARIA_DE_ADMIN: [{ lat: 19.508092, lng: -99.139513 }, { lat: 19.508207, lng: -99.139106 }, { lat: 19.508727, lng: -99.139282 }, { lat: 19.508582, lng: -99.139760 }],
    ROBERTO_CASA: [{ lat: 19.30780063029889, lng: -99.27004748827716 }, { lat: 19.30710883262681, lng: -99.2698072817915 }, { lat: 19.307003466264522, lng: -99.27032603759297 }, { lat: 19.307744222291376, lng: -99.27053579536852 }]
  };

  constructor(private toastController: ToastController,
    private storageService: Storage,
    public pushservice: PushService,
    private endpointService: EndpointService
  ) {
    this.init();
  }
  

  async init() {
    const storage = await this.storageService.create();
    this.storage = storage;
  }

  async ngOnInit() {
    this.endpointService.getUser("2");
    this.seguimiento();

    //se ejecutara en segundo plano 
    const { BackgroundTask } = Plugins;
    let taskId = BackgroundTask['beforeExit'](async () => {
      this.seguimiento();
      BackgroundTask['finish']({
        taskId
      });
    });

    
  }

  async seguimiento() { //se obtiene la posicion
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
        // Verifica si el usuario ha entrado en una nueva zona
        this.verificarZona();
        // Verifica si el usuario ha entrado en un nuevo punto
        this.verificarPuntos();
      }
    });
  }

  ionViewDidEnter() {
    this.createMap();
  }
  ionViewDidLeave() {
    if (this.watchId) Geolocation.clearWatch({ id: this.watchId });
  }



  //aqui esta el codigo
  async createMap() {
    // Intenta obtener la ubicación del almacenamiento
    let position = await this.storage?.get('ubicacion');
    console.log("storage:", position);
    // Si no hay una ubicación guardada, obtén la ubicación actual
    if (!position) {
      position = await this.getCurrentPosition();
      console.log("ubicacion actual no encotrada en el storage");
      this.newPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    } else {
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
    //this.addMarker(this.newPosition);
    google.maps.event.addListenerOnce(this.map, 'tilesloaded', () => {
      this.addMarker(this.newPosition);
    });

    // Dibuja las zonas en el mapa
    for (const zona in this.zonas) {
      const coordenadas = this.zonas[zona];
      const poligono = new google.maps.Polygon({
        paths: coordenadas,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      });
      poligono.setMap(this.map);
    }

    // Obtiene los puntos del almacenamiento
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
      message: '<h1>ZONA REPORTADA</h1>',
      duration: 2500,
      position: 'middle',
      color: 'warning',
      animated: true,
      cssClass: 'toast-message',
      icon: "warning-outline"
    });
    await toast.present();
  }

  async verificarZona() {
    const punto = new google.maps.LatLng(this.newPosition.lat, this.newPosition.lng);
    this.ultimaZona = await this.storage?.get('ultimaZona');
    let puntosSOS = await this.storage?.get('puntoSOS');
    let puntosREP = await this.storage?.get('puntoREP');
    for (const zona in this.zonas) {
      const coordenadas = this.zonas[zona];
      const poligono = new google.maps.Polygon({ paths: coordenadas });
      if (google.maps.geometry.poly.containsLocation(punto, poligono)) {
        if (this.ultimaZona !== zona) {
          console.log(`Has entrado en la zona ${zona}`);

          //aqui hace el conteo de cuantos puntos estan dentro de esa zona
          let contadorSOS = 0;
          let contadorREP = 0;
          if (puntosSOS) {
            for (const puntoSOS of puntosSOS) {
              if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(puntoSOS.lat, puntoSOS.lng), poligono)) {
                contadorSOS++;
                console.log(contadorSOS);
              }
            }
          }
          if (puntosREP) {
            for (const puntoREP of puntosREP) {
              if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(puntoREP.lat, puntoREP.lng), poligono)) {
                contadorREP++;
                console.log(contadorREP);

              }
            }
          }

          //iguala la ultima zona con zona, para que no este repitiendose cada ves la noti
          this.ultimaZona = zona;
          this.storage?.set('ultimaZona', this.ultimaZona);

          //ya envia la noti con la info
          this.pushservice.enviarNotificacion(`Has entrado a ${zona}`, `Numero de zonas reportadas: ${contadorREP}, Numero de S.O.S precionados: ${contadorSOS}`, 'warning-outline', 'warning', coordenadas);
        }
        return;
      } else {
        if (this.ultimaZona === zona) {
          this.ultimaZona = null; // Si el usuario sale de la zona, restablece ultimaZona a null
          this.storage?.set('ultimaZona', this.ultimaZona);
        }
      }
    }
  }

  async verificarPuntos() {
    const punto = new google.maps.LatLng(this.newPosition.lat, this.newPosition.lng);
    this.ultimoPuntoSOS = await this.storage?.get('ultimoPuntoSOS') || { lat: 0, lng: 0 };
    this.ultimoPuntoREP = await this.storage?.get('ultimoPuntoREP') || { lat: 0, lng: 0 };
    console.log('ultimos puntos-----------', this.ultimoPuntoREP, this.ultimoPuntoSOS);
    // Verifica los puntos de 'puntoSOS'
    let puntosSOS = await this.storage?.get('puntoSOS');
    if (puntosSOS) {
      for (const puntoSOS of puntosSOS) {
        const distancia = google.maps.geometry.spherical.computeDistanceBetween(punto, new google.maps.LatLng(puntoSOS.lat, puntoSOS.lng));
        if (distancia <= 30) {
          if (this.ultimoPuntoSOS.lat !== puntoSOS.lat && this.ultimoPuntoSOS.lng !== puntoSOS.lng) {
            console.log('Has entrado en un punto de SOS');
            this.ultimoPuntoSOS = puntoSOS;
            this.storage?.set('ultimoPuntoSOS', this.ultimoPuntoSOS);
            let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${puntoSOS.lat},${puntoSOS.lng}&key=AIzaSyD4tPyNPgPyGZjo1oWzCS3GZZ152lmohfs`;
            // Realiza la solicitud
            fetch(url)
              .then(response => response.json())
              .then(data => {
                // La dirección se encuentra en el primer resultado, en el campo 'formatted_address'
                let direccion = data.results[0].formatted_address;
                console.log(direccion);
                this.pushservice.enviarNotificacion('Has entrado a una zona reportada', direccion, 'radio-sharp', 'danger', puntoSOS);
              })
              .catch(error => console.error(error));
            return;
          }
        } else {
          if (this.ultimoPuntoSOS.lat === puntoSOS.lat && this.ultimoPuntoSOS.lng === puntoSOS.lng) {
            this.ultimoPuntoSOS = { lat: 0, lng: 0 }; // Si el usuario sale del punto restablece ultimoPunto
            this.storage?.set('ultimoPuntoSOS', this.ultimoPuntoSOS);
          }
        }
      }
    }
    // Verifica los puntos de 'puntoREP'
    let puntosREP = await this.storage?.get('puntoREP');
    if (puntosREP) {
      for (const puntoREP of puntosREP) {
        const distancia = google.maps.geometry.spherical.computeDistanceBetween(punto, new google.maps.LatLng(puntoREP.lat, puntoREP.lng));
        console.log(distancia);
        if (distancia <= 30) {
          if (this.ultimoPuntoREP.lat !== puntoREP.lat && this.ultimoPuntoREP.lng !== puntoREP.lng) {
            console.log(this.ultimoPuntoREP);
            console.log(puntoREP);
            console.log('Has entrado en un punto de REP');
            this.ultimoPuntoREP = puntoREP;
            this.storage?.set('ultimoPuntoREP', this.ultimoPuntoREP);
            let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${puntoREP.lat},${puntoREP.lng}&key=AIzaSyD4tPyNPgPyGZjo1oWzCS3GZZ152lmohfs`;
            // Realiza la solicitud
            fetch(url)
              .then(response => response.json())
              .then(data => {
                // La dirección se encuentra en el primer resultado, en el campo 'formatted_address'
                let direccion = data.results[0].formatted_address;
                console.log(direccion);
                this.pushservice.enviarNotificacion('Has entrado a una zona reportada', direccion, 'warning-outline', 'warning', puntoREP);
              })
              .catch(error => console.error(error));
            return;
          }
        } else {
          if (this.ultimoPuntoREP.lat === puntoREP.lat && this.ultimoPuntoREP.lng === puntoREP.lng) {
            this.ultimoPuntoREP = { lat: 0, lng: 0 }; // Si el usuario sale del punto restablece ultimoPunto
            this.storage?.set('ultimoPuntoREP', this.ultimoPuntoREP);
          }
        }
      }
    }
  }

  compartirLocation() {
    const numbers: string[] = ["+52 1 221 943 0106"];
    const latitude = this.newPosition.lat;
    const longitude = this.newPosition.lng;
    for (const phoneNumber of numbers) {
      const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      window.open(whatsappUrl, '_system');
    }
  }

  compartirTiempoReal() {
    const numbers: string[] = ["+52 1 221 943 0106"];
    for (const phoneNumber of numbers) {
      const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=Por favor, sigue las instrucciones para compartir tu ubicación en tiempo real: Abre el chat de WhatsApp -> Toca el clip de adjuntar -> Ubicación -> Ubicación en tiempo real`;
      window.open(whatsappUrl, '_system');
    }
  }

  refreshBoton() {
    this.router.navigateByUrl('/z-help/inicio')
  }

  perfil() {
    this.router.navigateByUrl('/perfil')
  }
}
