/* eslint-disable max-len */
/* eslint-disable no-cond-assign */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.page.html',
  styleUrls: ['./modal-detalle.page.scss'],
})
export class ModalDetallePage implements OnInit {

  server: string;
  constructor(
    private iab: InAppBrowser,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private provider: ProviderService
  ) {
    this.server = provider.server;
  }

  dataResponse: any;
  datos: any = [];
  informacion_orden = {
    consecutivo: '',
    unidad: '',
    tecnico: '',
    tipo_orden: '',
    fch_orden: '',
    latitud: '',
    longitud: '',
    fch_last_pos: '',
    imei: '',
    proveedor: '',
    tipo_vehiculo: '',
    usr_crea: '',
    marca: '',
    serie: '',
    placas: '',
    latitud_tecnico: '',
    longitud_tecnico: '',
    ubicacion_servicio: '',
    sensor_on: 0,
    sensor_boton: 0,
    sensor_corriente: 0,
    sensor_temperatura: 0,
    sensor_driverId: 0,
    sensor_tomaFuerza: 0,
    sensor_caja: 0,
    sensor_cabina: 0,
    sensor_combustible: 0,
    sensor_buzzer:0,
    sensor_paro: 0,
    servicio_realizado: '',
    observaciones: '',
    firma: '',
    status_orden: '',
    nombre: '',
    apellido_materno: '',
    apellido_paterno: '',
    foto: ''
  };

  ngOnInit() {
    this.datos = this.navParams.get('datos');
    console.log('datos',this.datos);
    let body = {
      strackMaps: 'strackMapDt',
      consecutivo: this.datos
    };
    this.provider.cargarDetalle(body, 'db_cargar_detalle.php').subscribe(data => {
      this.dataResponse = data.result;
      console.log(this.dataResponse);
      this.informacion_orden.consecutivo = this.dataResponse.consecutivo;
      this.informacion_orden.unidad = this.dataResponse.unidad;
      this.informacion_orden.tecnico = this.dataResponse.tecnico;
      this.informacion_orden.tipo_orden = this.dataResponse.tipo_orden;
      this.informacion_orden.fch_orden = this.dataResponse.fch_orden.date;
      this.informacion_orden.usr_crea = this.dataResponse.usr_crea;
      this.informacion_orden.latitud = this.dataResponse.latitud;
      this.informacion_orden.longitud = this.dataResponse.longitud;
      this.informacion_orden.fch_last_pos = this.dataResponse.fch_last_pos.date;
      this.informacion_orden.sensor_on = this.dataResponse.sensor_on;
      this.informacion_orden.sensor_paro = this.dataResponse.sensor_paro;
      this.informacion_orden.sensor_boton = this.dataResponse.sensor_boton;
      this.informacion_orden.sensor_buzzer = this.dataResponse.sensor_buzzer;
      this.informacion_orden.sensor_caja = this.dataResponse.sensor_caja;
      this.informacion_orden.imei = this.dataResponse.imei;
      this.informacion_orden.proveedor = this.dataResponse.proveedor;
      this.informacion_orden.observaciones = this.dataResponse.obs;
      this.informacion_orden.marca = this.dataResponse.marca;
      this.informacion_orden.placas = this.dataResponse.placas;
      this.informacion_orden.serie = this.dataResponse.serie;
      this.informacion_orden.tipo_vehiculo = this.dataResponse.tipo_vehiculo;
      this.informacion_orden.latitud_tecnico = this.dataResponse.latitud_tecnico;
      this.informacion_orden.longitud_tecnico = this.dataResponse.longitud_tecnico;
      this.informacion_orden.ubicacion_servicio = this.dataResponse.ubicacion_servicio;
      this.informacion_orden.sensor_cabina = this.dataResponse.sensor_cabina;
      this.informacion_orden.sensor_combustible = this.dataResponse.sensor_combustible;
      this.informacion_orden.sensor_tomaFuerza = this.dataResponse.sensor_tomaFuerza;
      this.informacion_orden.sensor_temperatura = this.dataResponse.sensor_temperatura;
      this.informacion_orden.sensor_corriente = this.dataResponse.sensor_corriente;
      this.informacion_orden.servicio_realizado = this.dataResponse.servicio_realizado;
      this.informacion_orden.firma = this.dataResponse.firma;
      this.informacion_orden.status_orden = this.dataResponse.status_orden;
      this.informacion_orden.nombre = this.dataResponse.nombre;
      this.informacion_orden.apellido_materno = this.dataResponse.apellido_materno;
      this.informacion_orden.apellido_paterno = this.dataResponse.apellido_paterno;
      this.informacion_orden.foto = this.dataResponse.foto;
      this.informacion_orden.sensor_driverId = this.dataResponse.sensor_driverId;
      this.validarInformacion();
    });
  }

  cerrar(){
    this.modalCtrl.dismiss();
  }

  sensor1: boolean = true;
  sensor2: boolean = true;
  sensor3: boolean = true;
  sensor4: boolean = true;
  sensor5: boolean = true;
  sensor6: boolean = true;
  sensor7: boolean = true;
  sensor8: boolean = true;
  sensor9: boolean = true;
  sensor10: boolean = true;
  sensor11: boolean = true;

  validarInformacion(){
    if(this.informacion_orden.sensor_boton == 0){
      this.sensor1 = false;
    }
     if(this.informacion_orden.sensor_buzzer == 0){
      this.sensor2 = false;
    }
     if(this.informacion_orden.sensor_cabina == 0){
      this.sensor3 = false;
    }
     if(this.informacion_orden.sensor_caja == 0){
      this.sensor4 = false;
    }
     if(this.informacion_orden.sensor_combustible == 0){
      this.sensor5 = false;
    }
     if(this.informacion_orden.sensor_corriente == 0){
      this.sensor6 = false;
    }
     if(this.informacion_orden.sensor_driverId == 0){
      this.sensor7 = false;
    }
     if(this.informacion_orden.sensor_on == 0){
      this.sensor8 = false;
    }
     if(this.informacion_orden.sensor_paro == 0){
      this.sensor9 = false;
    }
     if(this.informacion_orden.sensor_temperatura == 0){
      this.sensor10 = false;
    }
     if(this.informacion_orden.sensor_tomaFuerza == 0){
      this.sensor11 = false;
    }
  }

  comoLlegar(){
    this.iab.create(
      `https://www.google.com.mx/maps/place/`+this.informacion_orden.latitud+`,`+this.informacion_orden.longitud+`/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d`+this.informacion_orden.latitud+`!4d`+this.informacion_orden.longitud+``,`_system`
    );
  }

  comoLlegarU(){
      this.iab.create(
        `https://www.google.com.mx/maps/place/`+this.informacion_orden.latitud_tecnico+`,`+this.informacion_orden.longitud_tecnico+`/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d`+this.informacion_orden.latitud_tecnico+`!4d`+this.informacion_orden.longitud_tecnico+``,`_system`
      );
  }
}
