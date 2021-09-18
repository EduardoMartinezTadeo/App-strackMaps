import { TabAjustesPageModule } from './../tab-ajustes/tab-ajustes.module';
/* eslint-disable @typescript-eslint/naming-convention */
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuTabsPageRoutingModule } from './menu-tabs-routing.module';

import { MenuTabsPage } from './menu-tabs.page';
import { TabHistorialPageModule } from '../tab-historial/tab-historial.module';
import { TabInicioPageModule } from '../tab-inicio/tab-inicio.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuTabsPageRoutingModule,
    SuperTabsModule,
    TabInicioPageModule,
    TabAjustesPageModule,
    TabHistorialPageModule
  ],
  declarations: [MenuTabsPage]
})
export class MenuTabsPageModule {}
