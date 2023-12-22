import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  private router = inject(Router);
  
  constructor() { }

  ngOnInit() {
  }

  guardar() {
    this.router.navigateByUrl('/z-help/contacts')
  }

  volver() {
    this.router.navigateByUrl('/z-help/contacts')
  }

}
