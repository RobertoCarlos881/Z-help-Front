import { Component } from '@angular/core';
import { PushService } from './services/push.service';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private pushService: PushService,
    private platform: Platform

  ) {
    
    this.OneSignalInit();
  }

 OneSignalInit() {
  this.platform.ready().then(()=>{
    this.pushService.configInicial();
  })
}

  
}
