/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {
  myModel: any;
  showPassword = false;
  passwordToggleIcon = 'eye';

  campo1: boolean = false;
  campo2: boolean = false;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router
  ) {
    this.myModel = {};
   }

  ngOnInit() {
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }

  informacion_Usuario = {
    correo_electronico: '',
    contrasena: ''
  };


  validarCampos(){
    if(this.informacion_Usuario.correo_electronico == ''){
      this.correoElectronico();
      this.campo1 = true;
    } else if(this.informacion_Usuario.contrasena == ''){
      this.contrasena();
      this.campo2 = true;
    } else {
      this.validandoInformacion();
    }
  }


  async correoElectronico() {
    const toast = await this.toastController.create({
      message: 'El correo electrónico no puede ir vacio...',
      position: 'bottom',
      duration: 1500,
      color: 'error',
      animated: true,
      cssClass: 'toast-style',
      buttons: [
        {
          side: 'start',
          icon: 'mail'
        }
      ]
    });
    await toast.present();
  }

  async contrasena() {
    const toast = await this.toastController.create({
      message: 'La contraseña no puede ir vacia...',
      position: 'bottom',
      duration: 1500,
      color: 'error',
      animated: true,
      cssClass: 'toast-style',
      buttons: [
        {
          side: 'start',
          icon: 'keypad',
        }
      ]
    });
    await toast.present();
  }

  async validandoInformacion() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      duration: 2500,
      message: 'Espere un momento...',
      translucent: true,
      cssClass: 'alert-style',
    });
    await loading.present();
    setTimeout(() => {
      this.router.navigateByUrl('/menu-tabs');
    }, 1800);
  }
}
