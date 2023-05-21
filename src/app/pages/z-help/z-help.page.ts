import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-z-help',
  templateUrl: './z-help.page.html',
  styleUrls: ['./z-help.page.scss'],
})
export class ZHelpPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
  }
  mostrarMenu() {
    this.menu.enable(true, 'MENU');
    this.menu.open('MENU');
  }

}
