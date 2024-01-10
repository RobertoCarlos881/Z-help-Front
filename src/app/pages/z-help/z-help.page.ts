import { Component, OnInit } from '@angular/core';
import {SmsManager} from "@byteowls/capacitor-sms";
import { MenuController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Contact, Contacts } from 'src/app/interfaces';
import { EndpointService } from 'src/app/services/endpoint.service';

@Component({
  selector: 'app-z-help',
  templateUrl: './z-help.page.html',
  styleUrls: ['./z-help.page.scss'],
})
export class ZHelpPage implements OnInit {
  private storage: Storage | null = null;

  constructor(private menu: MenuController, 
              private toastController: ToastController,
              private storageService: Storage,
              private endpointService: EndpointService) {
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
    let numbers: string[] = [];
    this.presentToast();
    const idUser = await this.endpointService.getUserData();
    // Obtiene la ubicación actual del almacenamiento
    const currentPosition = await this.storage?.get('ubicacion');  
    
    this.endpointService.createActivity(currentPosition.actual.lat, currentPosition.actual.lng, idUser, true)
      .subscribe({
        error: (message) => {
          console.log("Aqui esta el error", message);
        }
      })

    let puntoSOS = await this.storage?.get('puntoSOS');
    if (!puntoSOS) {
      puntoSOS = [];
    }
    // Añade la ubicación actual a la lista de 'puntoSOS'
    puntoSOS.push(currentPosition.actual);
    const idUsuario = await this.endpointService.getUserData(); 
    const contactData: Contacts[] | undefined = await this.endpointService.getContactoAll(idUsuario);

    if (contactData) {
      numbers = contactData.map(contacto => `+52 1 ${contacto.numero_contacto}`);
    } else {
      console.error('La respuesta del servicio es undefined.');
    }
    
    const latitude = currentPosition.actual.lat;
    const longitude = currentPosition.actual.lng;
    const locationUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    SmsManager.send({
        numbers: numbers,
        text: `PRESIONÉ EL BOTÓN S.O.S, Aquí está mi ubicación: ${locationUrl}`,
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
