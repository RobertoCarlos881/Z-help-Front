import { Component} from '@angular/core';
import { PushService } from './services/push.service';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import {SmsManager} from "@byteowls/capacitor-sms";
import { Browser } from '@capacitor/browser';
import { PopoverController } from '@ionic/angular';
import { TelefonosComponent } from './components/telefonos/telefonos.component';
//import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  private storage: Storage | null = null;
  constructor(
    private pushService: PushService,
    private platform: Platform,
    private toastController: ToastController,
    private storageService: Storage,
    private popoverCtrl: PopoverController

  ) {    
    this.OneSignalInit();
  }

  async ngOnInit() {
    const storage = await this.storageService.create();
    this.storage = storage;
  }

 OneSignalInit() {
  this.platform.ready().then(()=>{
    this.pushService.configInicial();
  })
}

async PruebaBotonSOS() {
  this.presentToast();

  // Obtiene la ubicación actual del almacenamiento
  const currentPosition = await this.storage?.get('ubicacion'); //ubicacion actual
  console.log("esto es current position", currentPosition);
  console.log('ubicación SOS:', currentPosition.actual);  
  const latitude = currentPosition.actual.lat;
  const longitude = currentPosition.actual.lng;
  const locationUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const numbers: string[] = ["+52 1 221 943 0106"];// se envia a la lista de contactos
      SmsManager.send({
          numbers: numbers,
          text: `Estoy probando el boton de S.O.S de mi aplicacion Z-Help, Aquí está mi ubicación: ${locationUrl}`,
      }).then(() => {
        this.presentToast2();
      }).catch(error => {
          console.error(error);
      });
}
async presentToast() {
  const toast = await this.toastController.create({
    message: '<h1><img src="/assets/alarma.gif" />PROBANDO S.O.S<img src="/assets/alarma.gif" /></h1>',///assets/alarma.gif
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

async abrirTerminosYCondiciones() {
  await Browser.open({ url: 'https://drive.google.com/file/d/195FY72W8xVeS0Q0MdAf9o4L6J5z0UfUR/view?usp=sharing' });
}

Ayuda(){
  const numbers: string[] = ["+52 1 221 943 0106"];
    const whatsappUrl = `whatsapp://send?phone=${numbers}&text=Hola, necesito ayuda con mi aplicacion Z-Help.`;
    window.open(whatsappUrl, '_system');
  
}

async presentPopover() {
  const popover = await this.popoverCtrl.create({
    component: TelefonosComponent,
    cssClass: 'contact-popover',
    mode: 'ios',
    translucent: false
  });

  await popover.present();
}
  
}
