import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalNuevaOrdenPage } from './modal-nueva-orden.page';

const routes: Routes = [
  {
    path: '',
    component: ModalNuevaOrdenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalNuevaOrdenPageRoutingModule {}
