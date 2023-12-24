import { EventEmitter, Injectable } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import OSNotificationWillDisplayEvent from 'onesignal-cordova-plugin/dist/NotificationReceivedEvent';
import OSNotification from 'onesignal-cordova-plugin/dist/OSNotification';
import { Storage } from '@ionic/storage-angular';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  notis: any[] = [];
  pushListener = new EventEmitter<OSNotification>();
  notificationId = 0; // Agrega un ID de notificación que se incrementará cada vez

  constructor(private storage: Storage,
              private router: Router) {
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
 
  async handleNotificationTap() {
    LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
      let passpush = JSON.stringify(notification);
      console.log('notificacion info:', passpush);
      this.router.navigate(['/z-help/actividad/sos'], { queryParams: { data: passpush } });
    });
  }
}
