import { Component, computed, effect, inject } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { Platform, ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';
import { SmsManager } from "@byteowls/capacitor-sms";
import { Browser } from '@capacitor/browser';

import { TelefonosComponent } from './components/telefonos/telefonos.component';
import { PushService } from './services/push.service';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/enum';
import { EndpointService } from './services/endpoint.service';
import { Contacts } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  datosUsuario?: any;
  public datosUbicacion: any;
  public userId: any;
  private authService = inject(AuthService);
  private router = inject(Router);
  public user = computed( () => this.authService.currentUser() );
  private storage: Storage | null = null;
  
  constructor(
    private pushService: PushService,
    private platform: Platform,
    private toastController: ToastController,
    private storageService: Storage,
    private popoverCtrl: PopoverController,
    private endpointService: EndpointService,
    private menu: MenuController
  ) {
    window.addEventListener('actualizarMenu', (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent && customEvent.detail && customEvent.detail.actualizar) {
        this.mostrarNombre().then(userData => {
          this.datosUsuario = userData;
        });
      }
    });
    this.OneSignalInit();
  }

  async ngOnInit() {
    const storage = await this.storageService.create();
    this.storage = storage;

    this.mostrarNombre().then(userData => {
      this.datosUsuario = userData;
    });
  }

  OneSignalInit() {
    this.platform.ready().then(() => {
      this.pushService.configInicial();
    })
  }

  async mostrarNombre() {
    const idUser = await this.endpointService.getUserData();
    const data = await this.endpointService.getUser(idUser);

    return data;
  }

  async PruebaBotonSOS() {
    let numbers: string[] = [];
    this.presentToast();

    const idUsuario = await this.endpointService.getUserData(); 
    const contactData: Contacts[] | undefined = await this.endpointService.getContactoAll(idUsuario);

    if (contactData) {
      numbers = contactData.map(contacto => `+52 1 ${contacto.numero_contacto}`);
    } else {
      console.error('La respuesta del servicio es undefined.');
    }

    const currentPosition = await this.storage?.get('ubicacion'); //ubicacion actual
    const latitude = currentPosition.actual.lat;
    const longitude = currentPosition.actual.lng;
    const locationUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    SmsManager.send({
      numbers: numbers,
      text: `Estoy probando el botón de S.O.S de mi aplicación Z-Help, Aquí está mi ubicación: ${locationUrl}`,
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

  Ayuda() {
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

  //Login
  public isUserAuthenticated(): boolean {
    return this.authService.authStatus() === AuthStatus.authenticated;
  }

  onLogout() {
    this.menu.close('MENU');
    this.authService.logout();
  }

  public finishedAuthCheck = computed<boolean>( () => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }
    return true;
  });

  public authStatusChangedEffect = effect( () => {
    const auth = this.storage?.get('authenticated');
    
    switch( this.authService.authStatus() ) {
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/z-help/inicio');
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/not-logged');
        return;
    }
  })

  perfil() {
    this.menu.close('MENU');
    this.router.navigateByUrl('/perfil')
  }

}
