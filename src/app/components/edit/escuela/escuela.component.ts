import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-escuela',
  templateUrl: './escuela.component.html',
  styleUrls: ['./escuela.component.scss'],
})
export class EscuelaComponent  implements OnInit {

  constructor(private popoverCtrl: PopoverController) { }
  escuela: any;
  ngOnInit() {}

  guardarNombre() {
    this.cerrarPopover(this.escuela);
  }
  
  async cerrarPopover(escuela: any = null) {
    await this.popoverCtrl.dismiss(escuela);
  }
}
