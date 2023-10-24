import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BoletaComponent } from 'src/app/components/edit/boleta/boleta.component';
import { CorreoComponent } from 'src/app/components/edit/correo/correo.component';
import { EscuelaComponent } from 'src/app/components/edit/escuela/escuela.component';
import { NombreComponent } from 'src/app/components/edit/nombre/nombre.component';
import { NumeroComponent } from 'src/app/components/edit/numero/numero.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  async PopoverNombre() {
    const popover = await this.popoverCtrl.create({
      component: NombreComponent,
      cssClass: 'contact-popover',
      translucent: false
    });
  
    await popover.present();
  }

  async PopoverCorreo() {
    const popover = await this.popoverCtrl.create({
      component: CorreoComponent,
      cssClass: 'contact-popover',
      translucent: false
    });
  
    await popover.present();
  }

  async PopoverEscuela() {
    const popover = await this.popoverCtrl.create({
      component: EscuelaComponent,
      cssClass: 'contact-popover',
      translucent: false
    });
  
    await popover.present();
  }

  async PopoverBoleta() {
    const popover = await this.popoverCtrl.create({
      component: BoletaComponent,
      cssClass: 'contact-popover',
      translucent: false
    });
  
    await popover.present();
  }

  async PopoverNumero() {
    const popover = await this.popoverCtrl.create({
      component: NumeroComponent,
      cssClass: 'contact-popover',
      translucent: false
    });
  
    await popover.present();
  }

}

