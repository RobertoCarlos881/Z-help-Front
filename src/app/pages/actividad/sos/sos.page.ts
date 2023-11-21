import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sos',
  templateUrl: './sos.page.html',
  styleUrls: ['./sos.page.scss'],
})
export class SOSPage implements OnInit {

  push: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log('------hola');
    this.route.queryParams.subscribe(params => {
      if (params && params['data']) {
        console.log(params['data']);
        this.push = JSON.parse(params['data']);
        
      }
    });   
  }

}
