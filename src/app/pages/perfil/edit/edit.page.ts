import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BoletaComponent } from 'src/app/components/edit/boleta/boleta.component';
import { CorreoComponent } from 'src/app/components/edit/correo/correo.component';
import { EscuelaComponent } from 'src/app/components/edit/escuela/escuela.component';
import { NombreComponent } from 'src/app/components/edit/nombre/nombre.component';
import { EndpointService } from 'src/app/services/endpoint.service';
//import { NumeroComponent } from 'src/app/components/edit/numero/numero.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  datosUsuario: any;

  datos = { //AQUI TU CARGAS LOS DATOS PARA MOSTRARLOS EN LA PAGINA, LOS PUSE NULL PA QUE NO ME PUSIERA PEDOS AHORITA
    nombre: null,
    correo: null,
    escuela: null,
    boleta: null,
  };
  constructor(
    private popoverCtrl: PopoverController,
    private endpointService: EndpointService
  ) { }

  async ngOnInit() {
    this.obtenerDatosUser().then(userData => {
      this.datosUsuario = userData;
    });
  }

  async PopoverNombre() {
    const popover = await this.popoverCtrl.create({
      component: NombreComponent,
      cssClass: 'contact-popover',
      translucent: false
    });
  
    await popover.present();
    const { data } = await popover.onWillDismiss();
    if (data) {//AQUI CHECA SI SE ESCRIBIO ALGO, SI REGRESO NULL NO HACE NADA,
      this.datos.nombre = data;
    }
  }

  async PopoverCorreo() {
    const popover = await this.popoverCtrl.create({
      component: CorreoComponent,
      cssClass: 'contact-popover',
      translucent: false
    });
  
    await popover.present();
    const { data } = await popover.onWillDismiss();
    if (data) {
      this.datos.correo = data;
    }
  }

  async PopoverEscuela() {
    const popover = await this.popoverCtrl.create({
      component: EscuelaComponent,
      cssClass: 'contact-popover',
      translucent: false
    });
  
    await popover.present();
    const { data } = await popover.onWillDismiss();
    if (data) {
      this.datos.escuela = data;
    }
  }

  async PopoverBoleta() {
    const popover = await this.popoverCtrl.create({
      component: BoletaComponent,
      cssClass: 'contact-popover',
      translucent: false
    });
  
    await popover.present();
    const { data } = await popover.onWillDismiss();
    if (data) {
      this.datos.boleta = data;
    }
  }

  async obtenerDatosUser() {
    try {
      const idUser = await this.endpointService.getUserData(); 
      const userData = await this.endpointService.getUser(idUser);
      
      return userData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

