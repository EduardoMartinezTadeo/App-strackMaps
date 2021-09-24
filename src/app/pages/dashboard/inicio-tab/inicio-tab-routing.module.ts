import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioTabPage } from './inicio-tab.page';

const routes: Routes = [
  {
    path: '',
    component: InicioTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioTabPageRoutingModule {}
