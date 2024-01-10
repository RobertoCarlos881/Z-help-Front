import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { ComentarComponent } from 'src/app/components/comentar/comentar.component';
import { PublicacionComponent } from 'src/app/components/publicacion/publicacion.component';



@Component({
  selector: 'app-foro',
  templateUrl: './foro.page.html',
  styleUrls: ['./foro.page.scss'],
})
export class ForoPage implements OnInit {
  private router = inject(Router);
  guardado: boolean = false
  segmentoSeleccionado: string = 'Todo';

  constructor( 
    private toastController: ToastController,
    private popoverCtrl: PopoverController) { }

  ngOnInit() {
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

  onClick (){
    this.guardado = !this.guardado;
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
        console.log("probando");
        
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

}
