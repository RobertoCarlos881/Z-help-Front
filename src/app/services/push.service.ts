import { EventEmitter, Injectable } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import OSNotificationWillDisplayEvent from 'onesignal-cordova-plugin/dist/NotificationReceivedEvent';
import OSNotification from 'onesignal-cordova-plugin/dist/OSNotification';
import { Storage } from '@ionic/storage-angular';
import { OSNotificationPayload } from '@awesome-cordova-plugins/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  notis: any[] = [];
  pushListener = new EventEmitter<OSNotification>();

  constructor(private storage: Storage) {
    this.storage.create();
    this.notis = [
      {
        title: 'titulo prueba',
        body: 'cuerpo prueba',
        date: new Date()
      }
    ];
   }

  async getMensajes() {
    await this.cargarMensajes();
    return [...this.notis];
  }

  configInicial(){
    OneSignal.init("7370f7f8-d4df-4998-a645-9a9992cd89ab");
    let recibido = async (event:OSNotificationWillDisplayEvent) => {
      await this.cargarMensajes();
      //let notiDataOS:OSNotification =  event.getNotification();
      let notiData =  JSON.stringify(event);
      //let notiData = JSON.parse(notiDataStr);
      //let data: any = notiData.rawPayload

      console.log('holaaaaaa', notiData);
      this.notis.unshift(JSON.parse(notiData));
      this.pushListener.emit( event.getNotification() );
      this.guardarMensajes();
      //console.log('holaaaaaaaaa------', this.notis);
      console.log('holaaaaaaaaa------');
this.notis.forEach((noti) => {
    console.log(noti.notification.title);
});

     
    };

    OneSignal.Notifications.addEventListener("foregroundWillDisplay", recibido);
    OneSignal.Notifications.requestPermission(true, function(permission) {
      console.log('Permission granted: ', permission);
    });
  }

  guardarMensajes() {
    this.storage.set('mensajes', this.notis );
  }

  async cargarMensajes() {
    this.notis =  await this.storage.get('mensajes') || [];
    return this.notis;
  }
}
