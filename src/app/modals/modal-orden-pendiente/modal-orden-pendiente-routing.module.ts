import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalOrdenPendientePage } from './modal-orden-pendiente.page';

const routes: Routes = [
  {
    path: '',
    component: ModalOrdenPendientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalOrdenPendientePageRoutingModule {}
