import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sos',
  templateUrl: './sos.page.html',
  styleUrls: ['./sos.page.scss'],
})
export class SOSPage implements OnInit {

  push: any;

  constructor(private route: ActivatedRoute) {
    //this.push = {};
   }

  ngOnInit() {
    console.log('------hola');
    this.route.queryParams.subscribe(params => {
      if (params && params['data']) {
        console.log(params['data']);
        this.push = JSON.parse(params['data']);
        
      }
      //console.log(this.push)
    });
    /*if (this.push) {
      console.log('notificacion info:',JSON.stringify(this.push));
    }
    this.route.params.subscribe(params => {
      this.push = params['push'];
      console.log('notificacion info:',this.push);
    });*/
    //console.log('notificacion info:',JSON.stringify(this.push));
       
    //this.push.forEach((noti) => {
      //console.log(noti.notification.title);
    //});
   
  }

}
