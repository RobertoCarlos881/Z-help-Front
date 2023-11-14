import { ApplicationRef, Component, OnInit } from '@angular/core';
import OSNotification from 'onesignal-cordova-plugin/dist/OSNotification';
import { PushService } from 'src/app/services/push.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {
  mensajes: any[]=[];

  constructor( public pushservice: PushService,
                private applicationRef: ApplicationRef) { }

  ngOnInit() {
    this.pushservice.pushListener.subscribe( noti => {
      this.mensajes.unshift( noti );
      this.applicationRef.tick();
    });
  }
/*
  async ionViewWillEnter() {

    console.log('Will Enter - Cargar mensajes');

    this.mensajes = await this.pushservice.getMensajes();

  }*/

}
