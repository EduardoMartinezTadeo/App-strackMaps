import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalNuevaOrdenPageRoutingModule } from './modal-nueva-orden-routing.module';

import { ModalNuevaOrdenPage } from './modal-nueva-orden.page';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalNuevaOrdenPageRoutingModule,
    SignaturePadModule
  ],
  declarations: [ModalNuevaOrdenPage]
})
export class ModalNuevaOrdenPageModule {}
