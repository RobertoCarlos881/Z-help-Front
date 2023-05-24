import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.page.html',
  styleUrls: ['./codigo.page.scss'],
})
export class CodigoPage implements OnInit {

  formularioCodigo: FormGroup;

  constructor(public fb: FormBuilder) { 

    this.formularioCodigo = this.fb.group({
      'codigo': new FormControl("",Validators.required)
    })

  }

  ngOnInit() {
  }

}
