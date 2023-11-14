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

  /*notis: any[] = [
    {
      title: 'titulo prueba',
      body: 'cuerpo prueba',
      date: new Date()
    }
  ];*/
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
    let recibido = async function(this: PushService, event:OSNotificationWillDisplayEvent) {
      //await this.cargarMensajes();
      //let notiData:OSNotification =  event.getNotification();
      let notiData =  JSON.stringify(event);
      //let notiData = JSON.parse(notiDataStr);
      //let data: any = notiData.rawPayload

     /* const existePush = this.notis.find( mensaje => mensaje.androidNotificationId === notiData.androidNotificationId );

    if ( existePush ) {
      return;
    }*/
      console.log('holaaaaaa', notiData);
      /*this.notis.push({
        title: notiData1.title,
        body: notiData1.body,
        date: new Date()
      });*/
      this.notis.unshift(notiData);
      this.pushListener.emit( event.getNotification() );
     // await this.guardarMensajes();
     console.log('holaaaaaaaaa------', this.notis)
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
