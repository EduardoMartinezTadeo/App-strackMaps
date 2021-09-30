import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalOrdenPage } from './modal-orden.page';

const routes: Routes = [
  {
    path: '',
    component: ModalOrdenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalOrdenPageRoutingModule {}
