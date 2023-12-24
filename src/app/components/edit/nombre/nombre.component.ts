import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.component.html',
  styleUrls: ['./nombre.component.scss'],
})
export class NombreComponent  implements OnInit {

  constructor(private popoverCtrl: PopoverController) { }
  ngOnInit() {}
  nombre: any;
  
  guardarNombre() {
    this.cerrarPopover(this.nombre);
  }
  
  async cerrarPopover(nombre: any = null) {
    await this.popoverCtrl.dismiss(nombre);
  }

}
