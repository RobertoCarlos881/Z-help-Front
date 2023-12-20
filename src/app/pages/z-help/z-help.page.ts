import { Component, OnInit } from '@angular/core';
import {SmsManager} from "@byteowls/capacitor-sms";
import { MenuController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-z-help',
  templateUrl: './z-help.page.html',
  styleUrls: ['./z-help.page.scss'],
})
export class ZHelpPage implements OnInit {
  private storage: Storage | null = null;

  constructor(private menu: MenuController, 
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

    const latitude = currentPosition.actual.lat;
    const longitude = currentPosition.actual.lng;
    const locationUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    const numbers: string[] = ["+52 1 221 943 0106"];
        SmsManager.send({
            numbers: numbers,
            text: `PRESIONÉ EL BOTON S.O.S, Aquí está mi ubicación: ${locationUrl}`,
        }).then(() => {
          this.presentToast2();
        }).catch(error => {
            console.error(error);
        });
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
  async presentToast2() {
    const toast = await this.toastController.create({
      message: '<h1>Mensaje enviado a tus contactos</h1>',///assets/alarma.gif
      duration: 2500,
      position: 'middle',
      color: 'danger',
      animated: true,
      cssClass: 'toast-message',
    });
    await toast.present();
  }
}
