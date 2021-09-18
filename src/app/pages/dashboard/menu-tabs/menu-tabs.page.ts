import { TabAjustesPage } from './../tab-ajustes/tab-ajustes.page';
import { TabHistorialPage } from './../tab-historial/tab-historial.page';
import { Component, OnInit } from '@angular/core';
import { TabInicioPage } from '../tab-inicio/tab-inicio.page';

@Component({
  selector: 'app-menu-tabs',
  templateUrl: './menu-tabs.page.html',
  styleUrls: ['./menu-tabs.page.scss'],
})
export class MenuTabsPage implements OnInit {
  tabInicio = TabInicioPage;
  tabHistorial = TabHistorialPage;
  tabAjustes = TabAjustesPage;
  constructor() { }

  ngOnInit() {
  }

}
