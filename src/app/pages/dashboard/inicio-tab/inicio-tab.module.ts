import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioTabPageRoutingModule } from './inicio-tab-routing.module';

import { InicioTabPage } from './inicio-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioTabPageRoutingModule
  ],
  declarations: [InicioTabPage]
})
export class InicioTabPageModule {}
