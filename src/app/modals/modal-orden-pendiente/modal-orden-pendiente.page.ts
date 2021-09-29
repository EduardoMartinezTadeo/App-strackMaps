import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-orden-pendiente',
  templateUrl: './modal-orden-pendiente.page.html',
  styleUrls: ['./modal-orden-pendiente.page.scss'],
})
export class ModalOrdenPendientePage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  cerrar() {
    this.modalController.dismiss();
  }
}
