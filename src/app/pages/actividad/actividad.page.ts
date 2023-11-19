import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PushService } from 'src/app/services/push.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage {
  mensajes: any[]=[];

  constructor( public pushservice: PushService,
              private router: Router) { }

  doRefresh(event:any) {
    console.log('Iniciando operación async');
  
    setTimeout(() => {
      this.ionViewWillEnter();
      console.log('La operación async ha terminado');
      event.target.complete();
    }, 1000);
  }
  

  async ionViewWillEnter() {

    console.log('Will Enter - Cargar mensajes');

    this.mensajes = await this.pushservice.getMensajes();

  }

  async borrarMensajes() {
    await this.pushservice.borrarMensajes();
    this.mensajes = [];

    console.log(this.mensajes);
  }

  navigateToDetail(push: any) {
    let passpush = JSON.stringify(push);
    console.log('notificacion info:',passpush);
    this.router.navigate(['/z-help/actividad/sos'], { queryParams: { data: passpush } });
    //this.router.navigate(['/z-help/actividad/sos'], { state: { push: passpush } });
    //this.router.navigate(['/z-help/actividad/sos', passpush]);
  }

}
