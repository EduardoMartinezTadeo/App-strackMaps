import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuTabsPage } from './menu-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: MenuTabsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuTabsPageRoutingModule {}
