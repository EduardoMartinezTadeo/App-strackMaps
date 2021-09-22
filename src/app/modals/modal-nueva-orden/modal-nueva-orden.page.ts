/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable quote-props */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { ProviderService } from 'src/app/services/provider.service';
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
    'minWidth': 0.2,
    'canvasWidth': 300,
    'canvasHeight': 100
  };

  latitud;
  longitud;
  firma;

  drawComplete() {
    this.firma = this.signaturePad.toDataURL();
    console.log(this.firma);
  }

  drawStart() {
    console.log('begin drawing');
  }

  clearPad() {
    this.signaturePad.clear();
  }


  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  card1: boolean = true;
  card2: boolean = false;
  card3: boolean = false;
  card4: boolean = false;
  constructor(
    private modalController: ModalController,
    private geolocation: Geolocation,
    private provider: ProviderService,
  ) {
  }

  ngOnInit() {
    this.ubicacion();
    this.cargarServicios();
    this.cargarAditamientos();
  }

  cerrar() {
    this.modalController.dismiss();
  }

  ubicacion() {
    this.geolocation.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then((res) => {
      this.latitud = res.coords.latitude;
      this.longitud = res.coords.longitude;
      console.log(this.latitud, this.longitud);
    }).catch((e) => {
      console.log(e);
    });
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

  anteriorCard() {
    this.card1 = true;
    this.card2 = false;
  }

  siguienteCard() {
    this.card1 = false;
    this.card2 = true;
  }

  siguienteCardComentario() {
    this.card1 = false;
    this.card2 = false;
    this.card3 = true;
  }

  anteriorCard2(){
    this.card1 = false;
    this.card2 = true;
    this.card3 = false;
  }

}
