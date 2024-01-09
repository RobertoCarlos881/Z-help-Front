import { tap } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { Browser } from '@capacitor/browser';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  private authService = inject( AuthService )
  private fb = inject( FormBuilder );
  private router = inject(Router);
  constructor(private toastController: ToastController) {}
  public myForm: FormGroup = this.fb.group({
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordRepeat: ['', [Validators.required]],
    checkbox: [false, [Validators.required]]
  });
  
  ngOnInit() {
    
  }

  async abrirTerminosYCondiciones() {
    await Browser.open({ url: 'https://drive.google.com/file/d/195FY72W8xVeS0Q0MdAf9o4L6J5z0UfUR/view?usp=sharing' });
  }

  async register() {
    const { telefono, password, passwordRepeat, checkbox } = this.myForm.value;

    if (password !== passwordRepeat) {
      this.presentToast('<h2>Las contraseñas no coinciden</h2>');
      console.log("Las contraseñas no estan repetidas");
      return;
    }

    if (!checkbox) {
      this.presentToast('<h2>Por favor, acepta los términos y condiciones</h2>');
      console.log("Por favor, acepta los términos y condiciones");
      return;
    }
    
    this.authService.register(telefono, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/z-help/inicio'),
        error: (message) => {
          console.log("Aqui esta el error", message);
        }
      })
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'middle',
      color: 'danger',
      animated: true,
      cssClass: 'toast-message',
    });
    await toast.present();
  }

}
