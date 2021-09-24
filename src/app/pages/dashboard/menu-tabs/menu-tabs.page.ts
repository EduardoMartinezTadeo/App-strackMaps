/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
import { TabAjustesPage } from './../tab-ajustes/tab-ajustes.page';
import { TabHistorialPage } from './../tab-historial/tab-historial.page';
import { Component, OnInit } from '@angular/core';
import { TabInicioPage } from '../tab-inicio/tab-inicio.page';
import { StorageService } from 'src/app/services/storage.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-menu-tabs',
  templateUrl: './menu-tabs.page.html',
  styleUrls: ['./menu-tabs.page.scss'],
})
export class MenuTabsPage implements OnInit {
  tabInicio = TabInicioPage;
  tabHistorial = TabHistorialPage;
  tabAjustes = TabAjustesPage;
  constructor(
    private storage: StorageService,
    private provider: ProviderService
  ) { }

  loadStyle: boolean = true;
  perfil: any;
  foto: string;
  server = this.provider.server;
  ngOnInit() {
    setTimeout(() => {
      this.perfil = this.storage.perfil;
      this.foto = this.perfil.foto;
      this.loadStyle = false;
    }, 1500);
  }

  onError(img) {
    img.src = "../assets/imgs/avatar_default.png";
  }
}
