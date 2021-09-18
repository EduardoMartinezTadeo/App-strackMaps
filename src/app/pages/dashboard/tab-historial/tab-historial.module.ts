import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabHistorialPage } from './tab-historial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [TabHistorialPage],
  entryComponents: [TabHistorialPage]
})
export class TabHistorialPageModule {}
