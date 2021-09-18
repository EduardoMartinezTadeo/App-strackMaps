import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabAjustesPage } from './tab-ajustes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [TabAjustesPage],
  entryComponents: [TabAjustesPage]
})
export class TabAjustesPageModule {}
