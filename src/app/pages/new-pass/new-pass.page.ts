import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.page.html',
  styleUrls: ['./new-pass.page.scss'],
})
export class NewPassPage implements OnInit {

  formularioNewPass: FormGroup;
  
  constructor(public fb: FormBuilder) {
    this.formularioNewPass = this.fb.group({
      'newpassword': new FormControl("", Validators.required),
      'confirmacionPassword': new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
  }

}
