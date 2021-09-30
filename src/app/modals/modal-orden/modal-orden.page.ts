/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal-orden',
  templateUrl: './modal-orden.page.html',
  styleUrls: ['./modal-orden.page.scss'],
})
export class ModalOrdenPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private dataService: DataService
  ) { }

  ngOnInit() {
  }


  cerrar(){
    this.modalController.dismiss();
  }

  data_busqueda = {
    clave: ''
  };

  responseData: any;
  buscarTractoCamion() {
    if (this.data_busqueda.clave == '') {
      this.informacionVacia();
    } else {
      this.dataService.buscarTractocamion(this.data_busqueda.clave).subscribe(data => {
        this.responseData = data;
        console.log(this.responseData);
      });
    }
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
}
