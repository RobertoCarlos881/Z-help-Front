import { Component} from '@angular/core';
import { PushService } from './services/push.service';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  constructor(
    private pushService: PushService,
    private platform: Platform,
    private storage: Storage

  ) {
    
    this.OneSignalInit();
  }
/*
  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }*/

 OneSignalInit() {
  this.platform.ready().then(()=>{
    this.pushService.configInicial();
  })
}

  
}
