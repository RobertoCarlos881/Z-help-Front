import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.component.html',
  styleUrls: ['./boleta.component.scss'],
})
export class BoletaComponent  implements OnInit {

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {}
  boleta: any;
  
  guardarNombre() {
    this.cerrarPopover(this.boleta);
  }
  
  async cerrarPopover(boleta: any = null) {
    await this.popoverCtrl.dismiss(boleta);
  }

}
