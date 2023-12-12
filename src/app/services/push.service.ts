import { EventEmitter, Injectable } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import OSNotificationWillDisplayEvent from 'onesignal-cordova-plugin/dist/NotificationReceivedEvent';
import OSNotification from 'onesignal-cordova-plugin/dist/OSNotification';
import { Storage } from '@ionic/storage-angular';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  notis: any[] = [];
  pushListener = new EventEmitter<OSNotification>();
  notificationId = 0; // Agrega un ID de notificación que se incrementará cada vez

  constructor(private storage: Storage) {
    this.storage.create();
    this.notis = [
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
      let notiData =  JSON.parse(JSON.stringify(event));
      // Agrega la fecha en el formato deseado
      notiData.notification.date = new Date();
      console.log('notificacion info:',JSON.stringify(event));
      console.log("noti------:", notiData);
      this.notis.unshift(notiData);
      this.pushListener.emit( event.getNotification() );
      this.guardarMensajes();

      this.notis.forEach((noti) => {
        console.log(noti.notification.additionalData.icon);
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

  async borrarMensajes() {
    await this.storage.remove('mensajes');
    this.notis = [];
    this.guardarMensajes();
  }

  async enviarNotificacion(title: string, body: string, icon: string, coloricon: string, coordenadas: object) {
    this.notificationId++; // Incrementa el ID de la notificación
    const notificacion = {
      notification: {
        title: title,
        body: body,
        id: this.notificationId, // Usa el ID de la notificación
        date: new Date(), // Agrega la fecha y hora actual
        smallIcon: coloricon, // Establece el icono de la notificación
        additionalData: {
          icon: icon,
          coloricon: coloricon,
          coordenadas: coordenadas // Agrega las coordenadas
        }
      }
    };
    await LocalNotifications.schedule({
      notifications: [notificacion.notification]
    });

    // Obtiene los mensajes actuales del almacenamiento
  let mensajes = await this.storage?.get('mensajes') || [];

  // Agrega la nueva notificación a los mensajes
  mensajes.unshift(notificacion);

  // Guarda los mensajes actualizados en el almacenamiento
  await this.storage?.set('mensajes', mensajes);
  }
  //{"notification":{"notificationId":"697f5347-02bd-4389-b1e6-5e0e17ea82b2","body":"esto es una prueba","title":"prueba Boton 1 ","additionalData":{"icon":"radio-sharp","coloricon":"danger"},"rawPayload":{"google.delivered_priority":"normal","google.sent_time":1702338985933,"google.ttl":259200,"google.original_priority":"normal","custom":"{\"i\":\"697f5347-02bd-4389-b1e6-5e0e17ea82b2\",\"a\":{\"icon\":\"radio-sharp\",\"coloricon\":\"danger\"}}","pri":"5","vis":"1","from":"647357451764","alert":"esto es una prueba","licon":"https://img.onesignal.com/tmp/f65e2175-cf46-4a6d-a675-c4a4171a7284/2ipeXyFRfeqwJULiLDWg_radio-sharp.png","title":"prueba Boton 1 ","google.message_id":"0:1702338985948932%b217eac6f9fd7ecd","google.c.sender.id":"647357451764"},"priority":5,"largeIcon":"https://img.onesignal.com/tmp/f65e2175-cf46-4a6d-a675-c4a4171a7284/2ipeXyFRfeqwJULiLDWg_radio-sharp.png","fromProjectNumber":"647357451764","lockScreenVisibility":1}}

}
