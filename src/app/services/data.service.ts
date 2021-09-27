/* eslint-disable max-len */
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
const apiURLBuscarUnidad = environment.apibuscarUnidad;
const apiURLRegistrarOrden = environment.apiregistrarOrden;
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
          switch (results) {
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
      duration: 2000,
      buttons: [
        {
          side: 'start',
          icon: 'hammer'
        }
      ]
    });
    await toast.present();
  }

  card2: boolean;
  buscarTractocamion(buscar: string) {
    return this.http.get(`${apiURLBuscarUnidad}?buscar=${buscar}`).pipe(map((results) => {
      switch (results) {
        case "No se encuentra la unidad": {
          this.toastNoUnidad();
          break;
        }
        default: {
          this.storage.set('vehiculo', results);
          this.cargandoInformacion();
          break;
        }
      }
    }));
  }


  async toastNoUnidad() {
    const toast = await this.toastController.create({
      message: '¡No se ha localizado la unidad!',
      position: 'bottom',
      mode: 'ios',
      color: 'danger',
      duration: 2000,
      buttons: [
        {
          side: 'start',
          icon: 'close-circle'
        }
      ]
    });
    await toast.present();
  }

  async cargandoInformacion() {
    const loading = await this.loadingController.create({
      cssClass: 'alert-style',
      message: 'Un momento por favor...',
      duration: 2000,
      backdropDismiss: false,
      mode: 'ios'
    });
    setTimeout(() => {
      this.toastInformacion();
    }, 1500);
    await loading.present();
  }

  async toastInformacion() {
    const toast = await this.toastController.create({
      message: 'Se ha cargado la información puede continuar...',
      position: 'bottom',
      duration: 2000,
      color: 'success',
      mode: 'ios',
      cssClass: 'toast-style',
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-circle-outline',
        }
      ]
    });
    await toast.present();
  }

  registrarOrden(
    unidad: string,
    tecnico: string,
    tipo_orden: string,
    usr_crea: string,
    latitud: string,
    longitud: string,
    fch_last_pos: string,
    sensor_on: string,
    sensor_paro: string,
    sensor_boton: string,
    sensor_buzzer: string,
    sensor_caja: string,
    imei: string,
    proveedor: string,
    obs: string,
    marca: string,
    placas: string,
    serie: string,
    tipo_vehiculo: string,
    latitud_tecnico: string,
    longitud_tecnico: string,
    ubicacion_servicio: string,
    sensor_cabina: string,
    sensor_combustible: string,
    sensor_tomaFuerza: string,
    sensor_driverId: string,
    sensor_temperatura: string,
    sensor_corriente: string,
    servicio_realizado: string,
    firma: any,
    status_orden: string) {
    return this.http.get(`${apiURLRegistrarOrden}?unidad=${unidad}&tecnico=${tecnico}&tipo_orden=${tipo_orden}&usr_crea=${usr_crea}&latitud=${latitud}&longitud=${longitud}&fch_last_pos=${fch_last_pos}&sensor_on=${sensor_on}&sensor_paro=${sensor_paro}&sensor_boton=${sensor_boton}&sensor_buzzer=${sensor_buzzer}&sensor_caja=${sensor_caja}&imei=${imei}&proveedor=${proveedor}&obs=${obs}&marca=${marca}&placas=${placas}&serie=${serie}&tipo_vehiculo=${tipo_vehiculo}&latitud_tecnico=${latitud_tecnico}&longitud_tecnico=${longitud_tecnico}&ubicacion_servicio=${ubicacion_servicio}&sensor_cabina=${sensor_cabina}&sensor_combustible=${sensor_combustible}&sensor_tomaFuerza=${sensor_tomaFuerza}&sensor_driverId=${sensor_driverId}&sensor_temperatura=${sensor_temperatura}&sensor_corriente=${sensor_corriente}&servicio_realizado=${servicio_realizado}&firma=${firma}&status_orden=${status_orden}`).pipe(map((results) => {
      this.responseData = results;
      console.log(this.responseData);
      if (unidad == '' && tecnico == '' && tipo_orden == '' && usr_crea == '' && latitud == '' && longitud == '' && fch_last_pos == '' && sensor_on == '' && sensor_paro == '' && sensor_boton == '' && sensor_buzzer == '' && sensor_caja == '' && proveedor == '' && obs == '' && marca == '' && placas == '' && serie == '' && tipo_vehiculo == '' && latitud_tecnico == '' && longitud_tecnico == '' && ubicacion_servicio == '' && sensor_cabina == '' && sensor_combustible == '' && sensor_tomaFuerza == '' && sensor_driverId == '' && sensor_temperatura == '' && sensor_corriente == '' && servicio_realizado == '' && firma == '' && status_orden == '') {
        console.log('campo vacio');
      } else {
        console.log('todo bien');
      }
    }));
  }
}
