import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { takeUntil } from 'rxjs';
import { ComentarComponent } from 'src/app/components/comentar/comentar.component';
import { PublicacionComponent } from 'src/app/components/publicacion/publicacion.component';
import { EndpointService } from 'src/app/services/endpoint.service';



@Component({
  selector: 'app-foro',
  templateUrl: './foro.page.html',
  styleUrls: ['./foro.page.scss'],
})
export class ForoPage implements OnInit {
  private router = inject(Router);
  guardado: boolean = false
  segmentoSeleccionado: string = 'Todo';
  publicacionData: any;

  constructor( 
    private toastController: ToastController,
    private popoverCtrl: PopoverController,
    private endpointService: EndpointService) { }

  async ngOnInit() {
    await this.traerPublicaciones();
  }

  async presentPopover2( ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PublicacionComponent,
      event: ev,
      side:"left",
      alignment:"center",
      mode: 'ios',
      size: 'auto',
      translucent: false
    });
  
    await popover.present();

  }

  async presentPopover() {
    const popover = await this.popoverCtrl.create({
      component: ComentarComponent,
      cssClass: 'contact-popover',
      mode: 'ios',
      translucent: false
    });
  
    await popover.present();
  }

  async onClick(publicacion: any) {
    const idUser = await this.endpointService.getUserData();
  
    if (publicacion.publicacionesGuardadas === false) {
      this.endpointService.createPublicacionGuardada(idUser, publicacion.id_publicaciones)
        .subscribe({
          error: (message) => {
            console.log("Aqui está el error", message);
          }
        });
      this.presentToast('bottom');
      publicacion.botonPresionado = !publicacion.botonPresionado;
      publicacion.publicacionesGuardadas = true;
    } else {
      await this.endpointService.deletePublicacionGuardada(publicacion.id_publicacionesguardadas).toPromise();
      this.presentToast('bottom');
      publicacion.botonPresionado = !publicacion.botonPresionado;
    publicacion.publicacionesGuardadas = false;
    }
  }
  
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Guardados actualizados ',
      duration: 1500,
      position: position,
      color: 'secondary'
    });

    await toast.present();
  }

  perfil() {
    this.router.navigateByUrl('/perfil')
  }

  addPublicacion() {
    this.router.navigateByUrl('/foro/publicar')
  }

  cargarDatos() {
    switch (this.segmentoSeleccionado) {
      case 'Todo':
        this.traerPublicaciones();
        break;
      case 'Consejos':
        console.log("voy bien");
        
        break;
      case 'Novedades':
        console.log("adios");
        
        break;
      default:
        break;
    }
  }

  async traerPublicaciones() {
    try {
      const idUser = await this.endpointService.getUserData();
      this.publicacionData = await this.endpointService.findAllPublications(idUser);
  
      this.publicacionData.forEach((publicacion: { created_at?: string, tiempoTranscurrido?: string }) => {
        if (publicacion && publicacion.created_at) {
          publicacion.tiempoTranscurrido = this.tiempoTranscurrido(publicacion.created_at);
        } else {
          console.log('created_at no está definido o está en un lugar diferente');
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  


  tiempoTranscurrido(fecha: string): string {
    if (!fecha) {
      return 'Fecha inválida';
    }

    const fechaFormateada = fecha.replace(/-/g, '/').replace('T', ' ').replace(/\.\d+Z$/, 'Z');
    const fechaCreacion = new Date(fechaFormateada);

    const ahora = new Date();
    

    const diferenciaEnMilisegundos = ahora.getTime() - fechaCreacion.getTime();
    const segundosTranscurridos = Math.floor(diferenciaEnMilisegundos / 1000);

    if (segundosTranscurridos < 60) {
      return `${segundosTranscurridos} segundo(s)`;
    } else if (segundosTranscurridos < 3600) {
      const minutosTranscurridos = Math.floor(segundosTranscurridos / 60);
      return `${minutosTranscurridos} minuto(s) `;
    } else if (segundosTranscurridos < 86400) {
      const horasTranscurridas = Math.floor(segundosTranscurridos / 3600);
      return `${horasTranscurridas} hora(s)`;
    } else {
      const diasTranscurridos = Math.floor(segundosTranscurridos / 86400);
      return `${diasTranscurridos} día(s)`;
    }
  }

}
