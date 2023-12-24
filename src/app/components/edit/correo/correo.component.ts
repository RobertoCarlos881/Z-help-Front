import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.scss'],
})
export class CorreoComponent  implements OnInit {

  constructor(private popoverCtrl: PopoverController) { }
  ngOnInit() {}
  correo: any;

  guardarNombre() {
    this.cerrarPopover(this.correo);
  }
  
  async cerrarPopover(correo: any = null) {
    await this.popoverCtrl.dismiss(correo);
  }

}
