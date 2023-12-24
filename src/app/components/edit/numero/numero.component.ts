import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-numero',
  templateUrl: './numero.component.html',
  styleUrls: ['./numero.component.scss'],
})
export class NumeroComponent  implements OnInit {

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {}
  numero: any;
  
  guardarNombre() {
    this.cerrarPopover(this.numero);
  }
  
  async cerrarPopover(numero: any = null) {
    await this.popoverCtrl.dismiss(numero);
  }

}
