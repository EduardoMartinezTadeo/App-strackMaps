/* eslint-disable no-fallthrough */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-cond-assign */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
const apiURLIniciarSesion = environment.apiiniciarSesion;
@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(
    private toastController: ToastController,
    private http: HttpClient,
    private loadingController: LoadingController,
    private storage: StorageService,
    private navCtrl: NavController
  ) { }

  result: any;
  responseData: any;
  toast: any;
  data_storage: string;
  iniciarSesion(correo_electronico: string, contrasena: string) {
    return this.http
      .get(
        `${apiURLIniciarSesion}?correo_electronico=${correo_electronico}&contrasena=${contrasena}`
      )
      .pipe(
        map((results) => {
          console.log(results);
          switch (results){
            case "Correo electronico o contrasena incorrectos": {
              this.toast = this.toastController
              .create({
                message: '¡Correo electronico o contraseña incorrectos!',
                duration: 2000,
                mode: 'ios',
                color: 'danger',
                position: 'bottom',
                buttons: [
                  {
                    side: 'start',
                    icon: 'sad'
                  }
                ]
              })
              .then((toastData) => {
                toastData.present();
              });
              break;
            }
            case "Su cuenta ha sido bloqueada": {
              this.toast = this.toastController
              .create({
                message: '¡Tu cuenta ha sido bloqueada!',
                duration: 2000,
                mode: 'ios',
                color: 'danger',
                position: 'bottom',
                buttons: [
                  {
                    side: 'end',
                    icon: 'hand-right'
                  }
                ]
              })
              .then((toastData) => {
                toastData.present();
              });
              break;
            }
            default: {
              this.loadingController
              .create({
                message: 'Un momento...',
                spinner: 'bubbles',
                translucent: true,
                duration: 2000,
                mode: 'ios',
                cssClass: 'alert-style'
              })
              .then((res) => {
                res.present();
                res.onDidDismiss().then((dis) => {
                  this.toastBienvenido();
                  this.storage.set('perfil', results);
                  this.navCtrl.navigateRoot([
                    '/menu-tabs',
                  ]);
                });
              });
              break;
            }
          }
        })
      );
  }

  async toastBienvenido() {
    const toast = await this.toastController.create({
      message: 'Bienvenido técnico',
      position: 'bottom',
      color: 'red',
      mode: 'ios',
      buttons: [
        {
          side: 'start',
          icon: 'hammer'
        }
      ]
    });
    await toast.present();
  }
}
