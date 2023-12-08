import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-z-help',
  templateUrl: './z-help.page.html',
  styleUrls: ['./z-help.page.scss'],
})
export class ZHelpPage implements OnInit {
  ubicaboton: any;
  watchId: any;

  constructor(private menu: MenuController, 
              private geolocation: Geolocation,
              private toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewDidLeave(){
    if(this.watchId) Geolocation.clearWatch({ id: this.watchId });
  }

  mostrarMenu() {
    this.menu.enable(true, 'MENU');
    this.menu.open('MENU');
  }

  async BotonSOS() {
    this.presentToast();

  const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
  const newPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  }
  console.log('ubicación:', newPosition);
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
