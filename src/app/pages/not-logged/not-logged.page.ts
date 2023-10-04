import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/login/login.component';


@Component({
  selector: 'app-not-logged',
  templateUrl: './not-logged.page.html',
  styleUrls: ['./not-logged.page.scss'],
})
export class NotLoggedPage implements OnInit {

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  async presentPopover() {
    const popover = await this.popoverCtrl.create({
      component: LoginComponent,
      cssClass: 'contact-popover',
      translucent: false
    });
  
    await popover.present();
  }

}
