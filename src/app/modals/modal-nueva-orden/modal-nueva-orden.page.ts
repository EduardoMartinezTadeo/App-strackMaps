/* eslint-disable no-cond-assign */
import { OnInit } from '@angular/core';
/* eslint-disable no-var */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable eol-last */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable curly */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable quote-props */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ProviderService } from 'src/app/services/provider.service';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-modal-nueva-orden',
  templateUrl: './modal-nueva-orden.page.html',
  styleUrls: ['./modal-nueva-orden.page.scss'],
})
export class ModalNuevaOrdenPage implements OnInit {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signatureImg: string;
  signaturePadOptions: Object = {
    'minWidth': 1,
    'canvasWidth': 300,
    'canvasHeight': 150
  };

  latitud;
  longitud;
  firma;
  firmaBase;
  a: any;
  imgRes: any;
  options: any


  data_busqueda = {
    clave: ''
  }

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  card1: boolean = true;
  card2: boolean = false;
  card3: boolean = false;
  card4: boolean = false;
  card5: boolean = false;
  card6: boolean = false;
  card7: boolean = false;
  card8: boolean = false;
  constructor(
    private modalController: ModalController,
    private geolocation: Geolocation,
    private provider: ProviderService,
    private dataService: DataService,
    private storage: StorageService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.informacion_orden.sensor_boton = '0';
    this.informacion_orden.sensor_buzzer = '0';
    this.informacion_orden.sensor_cabina = '0';
    this.informacion_orden.sensor_caja = '0';
    this.informacion_orden.sensor_combustible = '0';
    this.informacion_orden.sensor_corriente = '0';
    this.informacion_orden.sensor_driverId = '0';
    this.informacion_orden.sensor_on = '0';
    this.informacion_orden.sensor_paro = '0';
    this.informacion_orden.sensor_temperatura = '0';
    this.informacion_orden.sensor_tomaFuerza = '0';
  }

  public form = [
    {
      val: 'Preventiva', isChecked: false
    },
    {
      val: 'Correctivo', isChecked: false
    }
  ]

  public formUbicacion = [
    {
      val: 'Local', isChecked: false
    },
    {
      val: 'Domicilio', isChecked: false
    }
  ]

  perfil: any;
  ngOnInit() {
    this.ubicacion();
    this.cargarServicios();
    this.cargarAditamientos();
    this.cargarSensoresCaja();
    this.perfil = this.storage.perfil;
  }

  dataUrl: any;
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    this.dataUrl = this.signaturePad.toDataURL();
  }

  dataDraw: any;
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    this.dataDraw = 'Dibujo listo';
  }

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    this.signatureImg = this.signaturePad.toDataURL();
    this.informacion_orden.firma = this.signatureImg;
  }
  //Termina codigo firma

  async cerrar() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Está seguro de cancelar el registro de esta orden?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Aceptar',
          handler: () => {
            this.cargandoCierre();
          }
        }
      ]
    });

    await alert.present();
  }

  async cargandoCierre() {
    const loading = await this.loadingController.create({
      cssClass: 'alert-style',
      message: 'Espere un momento...',
      duration: 2000,
      spinner: 'bubbles'
    });
    await loading.present();
    setTimeout(() => {
      this.modalController.dismiss();
      this.storage.remove('vehiculo');
    }, 1500);
  }


  e: any;
  ubicacion() {
    this.geolocation.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then((res) => {
      this.latitud = res.coords.latitude;
      this.longitud = res.coords.longitude;
    }).catch((e) => {
      this.e = e;
      this.errorUbicacion(this.e);
    });
  }

  async errorUbicacion(e) {
    const toast = await this.toastController.create({
      message: e,
      position: 'top',
      color: 'danger',
      duration: 3000,
      buttons: [
        {
          side: 'start',
          icon: 'skull',
        }
      ]
    });
    await toast.present();
  }

  servicios: any;
  cargarServicios() {
    let body = {
      strackMaps: 'servicios'
    };
    this.provider.cargarServicios(body, 'db_cargar_servicios.php').subscribe((data) => {
      this.servicios = data.result;
    });
  }

  aditamientos: any;
  cargarAditamientos() {
    let body = {
      strackMaps: 'aditamentos'
    };
    this.provider.cargarAditamientos(body, 'db_cargar_sensores_aditamientos.php').subscribe((data) => {
      this.aditamientos = data.result;
    });
  }

  sensoresCaja: any;
  cargarSensoresCaja() {
    let body = {
      strackMaps: 'aditamentos'
    };
    this.provider.cargarSensoresCaja(body, 'db_cargar_sensores_remolque.php').subscribe((data) => {
      this.sensoresCaja = data.result;
    });
  }


  mostrarCard1() {
    this.card1 = true;
    this.card2 = false;
  }

  mostrarCard2() {
    this.card1 = false;
    this.card2 = true;
    this.card3 = false;
  }

  mostrarCard3() {
    this.card1 = false;
    this.card2 = false;
    this.card3 = true;
    this.card4 = false;
    this.card5 = false;
  }

  b: any;
  mostrarCard4() {
    if (this.informacion_orden.tipo_orden == '') {
      this.b = 'Debe seleccionar un tipo de mantenimiento...'
      this.toastTipoVehiculo(this.b);
    } else if (this.informacion_orden.tipo_vehiculo == 'Tractocamion') {
      this.card4 = true;
      this.card1 = false;
      this.card2 = false;
      this.card3 = false;
      this.card5 = false;
      this.card6 = false;
    } else {
      this.card5 = true;
      this.card1 = false;
      this.card2 = false;
      this.card3 = false;
      this.card4 = false;
      this.card6 = false;
    }
  }

  async toastTipoVehiculo(b) {
    const toast = await this.toastController.create({
      message: b,
      position: 'bottom',
      color: 'red',
      cssClass: 'toast-style',
      duration: 2000,
      buttons: [
        {
          side: 'end',
          icon: 'construct'
        }
      ]
    });
    await toast.present();
  }

  mostrarCard5() {
    if (this.informacion_orden.ubicacion_servicio == '') {
      this.toastServicio();
    } else if (this.informacion_orden.servicio_realizado == '') {
      this.toastTipoServicio();
    } else if (this.sensores == undefined) {
      this.toastTipoSensor();
    } else {
      this.card6 = true;
      this.card1 = false;
      this.card2 = false;
      this.card3 = false;
      this.card4 = false;
      this.card5 = false;
      this.card7 = false;
    }
  }

  async toastServicio() {
    const toast = await this.toastController.create({
      message: 'Debe seleccionar la ubicación en donde se realizo el servicio...',
      position: 'bottom',
      color: 'red',
      duration: 2000,
      cssClass: 'toast-style',
      buttons: [
        {
          side: 'end',
          icon: 'locate'
        }
      ]
    });
    await toast.present();
  }

  async toastTipoServicio() {
    const toast = await this.toastController.create({
      message: 'Debe seleccionar el tipo de servicio que se realizo ó realizara...',
      position: 'bottom',
      color: 'red',
      duration: 2000,
      cssClass: 'toast-style',
      buttons: [
        {
          side: 'end',
          icon: 'build'
        }
      ]
    });
    await toast.present();
  }

  async toastTipoSensor() {
    const toast = await this.toastController.create({
      message: 'Debe seleccionar al menos un tipo de sensor...',
      position: 'bottom',
      color: 'red',
      duration: 2000,
      cssClass: 'toast-style',
      buttons: [
        {
          side: 'end',
          icon: 'hardware-chip'
        }
      ]
    });
    await toast.present();
  }

  async alertComentario() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Está seguro de no ingresar un comentario?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Continuar',
          handler: () => {
            this.informacion_orden.observaciones = 'Sin observaciones...'
            this.card7 = true;
            this.card1 = false;
            this.card2 = false;
            this.card3 = false;
            this.card4 = false;
            this.card5 = false;
            this.card6 = false;
          }
        }
      ]
    });

    await alert.present();
  }

  mostrarCard6() {
    if(this.informacion_orden.observaciones == ''){
      this.alertComentario();
    }else {
      this.card7 = true;
            this.card1 = false;
            this.card2 = false;
            this.card3 = false;
            this.card4 = false;
            this.card5 = false;
            this.card6 = false;
    }
  }

  responseData: any;
  buscarTractoCamion() {
    if (this.data_busqueda.clave == '') {
      this.informacionVacia();
    } else {
      this.dataService.buscarTractocamion(this.data_busqueda.clave).subscribe(data => {
        this.responseData = data;
      });
    }
  }

  data_Vehiculo: any;
  fecha: any;
  fecha2: any;
  fecha3: any;
  fecha4: string;
  verificarVehiculo() {
    this.storage.cargarVehiculo();
    setTimeout(() => {
      this.data_Vehiculo = this.storage.vehiculo;
      if (this.data_Vehiculo == null) {
        this.toastDataVehiculo();
      } else {
        this.informacion_orden.marca = this.data_Vehiculo.marca;
        this.informacion_orden.imei = this.data_Vehiculo.imei;
        this.informacion_orden.fch_last_pos = this.data_Vehiculo.fechaPosicion.date;
        this.fecha = this.informacion_orden.fch_last_pos.split(' ');
        this.fecha2 = this.fecha[0];
        this.fecha3 = this.fecha[1];
        this.fecha4 = this.fecha3.split('.')[0];
        this.informacion_orden.fecha_posicionFinal = this.fecha2 + ' ' + this.fecha4;
        this.informacion_orden.placas = this.data_Vehiculo.placas;
        this.informacion_orden.latitud = this.data_Vehiculo.latitud;
        this.informacion_orden.longitud = this.data_Vehiculo.longitud;
        this.informacion_orden.proveedor = this.data_Vehiculo.proveedor;
        this.informacion_orden.serie = this.data_Vehiculo.serie;
        this.informacion_orden.tecnico = this.perfil.id;
        this.informacion_orden.usr_crea = this.perfil.id;
        this.informacion_orden.tipo_vehiculo = this.data_Vehiculo.tipo;
        this.informacion_orden.unidad = this.data_Vehiculo.unidad;
        this.mostrarCard2();
      }
    }, 500);
  }

  async toastDataVehiculo() {
    const toast = await this.toastController.create({
      message: 'Se necesita la información de la unidad...',
      duration: 2000,
      color: 'danger',
      cssClass: 'toast-style',
      buttons: [
        {
          side: 'start',
          icon: 'document-text',
        }
      ]
    });
    toast.present();
  }

  async informacionVacia() {
    const toast = await this.toastController.create({
      message: 'El número ECO no puede ir vacio...',
      duration: 2000,
      color: 'danger',
      cssClass: 'toast-style',
      buttons: [
        {
          side: 'end',
          icon: 'close-circle-outline',
        }
      ]
    });
    toast.present();
  }

  informacion_orden = {
    unidad: '',
    tecnico: '',
    tipo_orden: '',
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
    sensor_on: '',
    sensor_boton: '',
    sensor_corriente: '',
    sensor_temperatura: '',
    sensor_driverId: '',
    sensor_tomaFuerza: '',
    sensor_caja: '',
    sensor_cabina: '',
    sensor_combustible: '',
    sensor_buzzer: '',
    sensor_paro: '',
    servicio_realizado: '',
    observaciones: '',
    firma: '',
    fecha_posicionFinal: '',
    status_orden: ''
  }


  valores: any;
  onClick(data) {
    this.valores = data;
    if (this.valores.val == 'Preventivo') {
      this.form = [
        {
          val: 'Preventivo', isChecked: true
        },
        {
          val: 'Correctivo', isChecked: false
        }
      ];
      this.informacion_orden.tipo_orden = this.valores.val;
    } else {
      this.form = [
        {
          val: 'Preventivo', isChecked: false
        },
        {
          val: 'Correctivo', isChecked: true
        }
      ];
      this.informacion_orden.tipo_orden = this.valores.val;
    }
  }

  valoresU: any;
  onClickU(data) {
    this.valoresU = data;
    if (this.valoresU.val == 'Local') {
      this.formUbicacion = [
        {
          val: 'Local', isChecked: true
        },
        {
          val: 'Domicilio', isChecked: false
        }
      ];
      this.informacion_orden.ubicacion_servicio = this.valoresU.val;
      this.informacion_orden.longitud_tecnico = this.longitud;
      this.informacion_orden.latitud_tecnico = this.latitud;
    } else {
      this.formUbicacion = [
        {
          val: 'Local', isChecked: false
        },
        {
          val: 'Domicilio', isChecked: true
        }
      ];
      this.informacion_orden.ubicacion_servicio = this.valoresU.val;
      this.informacion_orden.longitud_tecnico = this.longitud;
      this.informacion_orden.latitud_tecnico = this.latitud;
    }
  }

  sensores: any;
  onClickSensores(data) {
    this.sensores = data.nombre_sensor_aditamiento;
    if (this.sensores == 'Sensor encendido') {
      this.informacion_orden.sensor_on = '1';
    } else if (this.sensores == 'Botón de pánico') {
      this.informacion_orden.sensor_boton = '1';
    } else if (this.sensores == 'Corta-corriente') {
      this.informacion_orden.sensor_corriente = '1';
    } else if (this.sensores == 'Sensores de temperatura') {
      this.informacion_orden.sensor_temperatura = '1';
    } else if (this.sensores == 'Driver ID') {
      this.informacion_orden.sensor_driverId = '1';
    } else if (this.sensores == 'Sensor toma fuerza') {
      this.informacion_orden.sensor_tomaFuerza = '1';
    } else if (this.sensores == 'Apertura de caja') {
      this.informacion_orden.sensor_caja = '1';
    } else if (this.sensores == 'Apertura de cabina') {
      this.informacion_orden.sensor_cabina = '1';
    } else if (this.sensores == 'Sensores de combustible') {
      this.informacion_orden.sensor_combustible = '1';
    } else if (this.sensores == 'Buzzer') {
      this.informacion_orden.sensor_buzzer = '1';
    } else if (this.sensores == 'Paro seguro') {
      this.informacion_orden.sensor_paro = '1';
    }
  }

  dataServicio: any;
  ionChangeServicio(event) {
    this.dataServicio = event.detail.value;
    this.informacion_orden.servicio_realizado = this.dataServicio;
  }


  dataResponseOrden: any;
  guardarNota() {
    if (this.informacion_orden.firma == "") {
      this.a = 'Es necesario firmar la orden...';
      this.toastValidarInformacion(this.a);
    } else {
      this.informacion_orden.status_orden = '1';
      let body = {
        strackMaps: 'registrarOrden',
        unidad: this.informacion_orden.unidad,
        tecnico: this.informacion_orden.tecnico,
        tipo_orden: this.informacion_orden.tipo_orden,
        usr_crea: this.informacion_orden.usr_crea,
        latitud: this.informacion_orden.latitud,
        longitud: this.informacion_orden.longitud,
        fch_last_pos: this.informacion_orden.fecha_posicionFinal,
        sensor_on: this.informacion_orden.sensor_on,
        sensor_paro: this.informacion_orden.sensor_paro,
        sensor_boton: this.informacion_orden.sensor_boton,
        sensor_buzzer: this.informacion_orden.sensor_buzzer,
        sensor_caja: this.informacion_orden.sensor_caja,
        imei: this.informacion_orden.imei,
        proveedor: this.informacion_orden.proveedor,
        obs: this.informacion_orden.observaciones,
        marca: this.informacion_orden.marca,
        placas: this.informacion_orden.placas,
        serie: this.informacion_orden.serie,
        tipo_vehiculo: this.informacion_orden.tipo_vehiculo,
        latitud_tecnico: this.informacion_orden.latitud_tecnico,
        longitud_tecnico: this.informacion_orden.longitud_tecnico,
        ubicacion_servicio: this.informacion_orden.ubicacion_servicio,
        sensor_cabina: this.informacion_orden.sensor_cabina,
        sensor_combustible: this.informacion_orden.sensor_combustible,
        sensor_tomaFuerza: this.informacion_orden.sensor_tomaFuerza,
        sensor_driverId: this.informacion_orden.sensor_driverId,
        sensor_temperatura: this.informacion_orden.sensor_temperatura,
        sensor_corriente: this.informacion_orden.sensor_corriente,
        servicio_realizado: this.informacion_orden.servicio_realizado,
        firma: this.informacion_orden.firma,
        status_orden: this.informacion_orden.status_orden
      }
      this.provider.registrarOrdenes(body, 'db_registrar_ordenes.php').subscribe((data) => {
        this.dataResponseOrden = data.success;
        console.log(this.dataResponseOrden);
        switch(this.dataResponseOrden) {
          case 'false': {
            this.loadingServicioExito();
            break;
          }
          case 'true': {
            this.loadingServicioExito();
            break;
          }
          default: {
            this.loadingServicioExito();
          }
        }
      });
    }
  }

  async loadingServicioError() {
    const loading = await this.loadingController.create({
      cssClass: 'alert-style',
      message: 'Espere un momento...',
      duration: 2000,
      mode: 'ios'
    });
    await loading.present();
    setTimeout(() => {
      this.toastError();
    }, 500);
  }

  async loadingServicioExito() {
    const loading = await this.loadingController.create({
      cssClass: 'alert-style',
      message: 'Espere un momento...',
      duration: 2000,
      mode: 'ios'
    });
    await loading.present();
    setTimeout(() => {
      this.toastExito();
    }, 500);
  }


  async toastError() {
    const toast = await this.toastController.create({
      cssClass: 'toast-style',
      mode: 'ios',
      message: 'Hubo un error al conectar con el servidor intente más tarde...',
      position: 'bottom',
      duration: 2000,
      color: 'danger',
      buttons: [
        {
          side: 'start',
          icon: 'skull'
        }
      ]
    });
    await toast.present();
    this.modalController.dismiss();
  }

  async toastExito() {
    const toast = await this.toastController.create({
      cssClass: 'toast-style',
      mode: 'ios',
      message: 'Se ha registrado su orden...',
      position: 'bottom',
      duration: 2000,
      color: 'success',
      buttons: [
        {
          side: 'start',
          icon: 'save'
        }
      ]
    });
    await toast.present();
    this.modalController.dismiss();
    this.storage.remove('vehiculo');
  }


  async toastValidarInformacion(dataT) {
    const toast = await this.toastController.create({
      message: dataT,
      position: 'bottom',
      duration: 2000,
      color: 'danger',
      mode: 'ios',
      cssClass: 'toast-style',
      buttons: [
        {
          side: 'end',
          icon: 'close-circle-outline'
        }
      ]
    });
    await toast.present();
  }

}
