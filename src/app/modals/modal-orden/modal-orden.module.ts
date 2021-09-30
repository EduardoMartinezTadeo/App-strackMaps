import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalOrdenPageRoutingModule } from './modal-orden-routing.module';

import { ModalOrdenPage } from './modal-orden.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalOrdenPageRoutingModule
  ],
  declarations: [ModalOrdenPage]
})
export class ModalOrdenPageModule {}
