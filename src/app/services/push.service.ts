import { Injectable } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor() { }

  configInicial(){

  // NOTE: Update the init value below with your OneSignal AppId.
  OneSignal.init("7370f7f8-d4df-4998-a645-9a9992cd89ab");
  
  
  let myClickListener = async function(event:any) {
        let notificationData = JSON.stringify(event);
    };
  OneSignal.Notifications.addEventListener("click", myClickListener);
  

  // Prompts the user for notification permissions.
  OneSignal.Notifications.requestPermission(true, function(permission) {
    console.log('Permission granted: ', permission);
});
    }
}
