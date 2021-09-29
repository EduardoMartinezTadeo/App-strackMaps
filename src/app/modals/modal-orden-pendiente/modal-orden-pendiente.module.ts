import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalOrdenPendientePageRoutingModule } from './modal-orden-pendiente-routing.module';

import { ModalOrdenPendientePage } from './modal-orden-pendiente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalOrdenPendientePageRoutingModule
  ],
  declarations: [ModalOrdenPendientePage]
})
export class ModalOrdenPendientePageModule {}
