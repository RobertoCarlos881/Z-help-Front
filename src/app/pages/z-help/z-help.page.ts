import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
//import { Geolocation } from '@capacitor/geolocation';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-z-help',
  templateUrl: './z-help.page.html',
  styleUrls: ['./z-help.page.scss'],
})
export class ZHelpPage implements OnInit {
  //ubicaboton: any;
  //watchId: any;
  private storage: Storage | null = null;

  constructor(private menu: MenuController, 
              //private geolocation: Geolocation,
              private toastController: ToastController,
              private storageService: Storage) {
    this.init();
  }
            
  async init() {
    const storage = await this.storageService.create();
    this.storage = storage;
  }

  ngOnInit() {
  }

  /*ionViewDidLeave(){
    if(this.watchId) Geolocation.clearWatch({ id: this.watchId });
  }*/

  mostrarMenu() {
    this.menu.enable(true, 'MENU');
    this.menu.open('MENU');
  }

  async BotonSOS() {
    this.presentToast();

    // Obtiene la ubicación actual del almacenamiento
    const currentPosition = await this.storage?.get('ubicacion');
    console.log('ubicación SOS:', currentPosition.actual);

    // Obtiene la lista de ubicaciones de 'puntoSOS' del almacenamiento
    let puntoSOS = await this.storage?.get('puntoSOS');
    if (!puntoSOS) {
      puntoSOS = [];
    }

    // Añade la ubicación actual a la lista de 'puntoSOS'
    puntoSOS.push(currentPosition.actual);

    // Guarda la lista actualizada de 'puntoSOS' en el almacenamiento
    await this.storage?.set('puntoSOS', puntoSOS);
  }
  
  

  async presentToast() {
    const toast = await this.toastController.create({
      message: '<h1><img src="/assets/alarma.gif" />S.O.S ACTIVO<img src="/assets/alarma.gif" /></h1>',///assets/alarma.gif
      duration: 2500,
      position: 'middle',
      color: 'danger',
      animated: true,
      cssClass: 'toast-message',
    });

    await toast.present();
  }

}
