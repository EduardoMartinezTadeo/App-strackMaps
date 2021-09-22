import { ModalNuevaOrdenPage } from './../../../modals/modal-nueva-orden/modal-nueva-orden.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab-inicio',
  templateUrl: './tab-inicio.page.html',
  styleUrls: ['./tab-inicio.page.scss'],
})
export class TabInicioPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {

  }

  async nuevaOrden() {
    const modal = await this.modalController.create({
      component: ModalNuevaOrdenPage
    });
    return await modal.present();
  }

}
