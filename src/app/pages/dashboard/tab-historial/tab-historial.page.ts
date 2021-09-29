/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab-historial',
  templateUrl: './tab-historial.page.html',
  styleUrls: ['./tab-historial.page.scss'],
})
export class TabHistorialPage implements OnInit {

  constructor(
    private storage: StorageService,
    private provider: ProviderService
  ) { }

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  candLoad: boolean = true;
  perfil: any;
  id_usuario: string;
  ngOnInit() {
    this.storage.cargarPerfil();
    setTimeout(() => {
      this.perfil = this.storage.perfil;
      this.id_usuario = this.perfil.id;
      this.cargarOrdenes();
    }, 800);
  }

  dataResponse: any;
  cargarOrdenes(){
    let body = {
      strackMaps: 'strackMapF1',
      usr_crea: this.id_usuario
    };
    this.provider.cargarOrdenes(body, 'db_cargar_ordenes.php').subscribe(data => {
      this.dataResponse = data.result;
      setTimeout(() => {
        this.candLoad = false;
      }, 1500);
    });
  }

  tipoBusqueda: any;
  ionChangeT(data){
    this.dataResponse = [];
    this.candLoad = true;
    this.tipoBusqueda = data.detail.value;
    if(this.tipoBusqueda == 'f1'){
      let body = {
        strackMaps: 'strackMapF2',
        usr_crea: this.id_usuario
      };
      this.provider.cargarOrdenes(body, 'db_cargar_ordenes.php').subscribe(data => {
        this.dataResponse = data.result;
        console.log(this.dataResponse);
        if(this.dataResponse.length == 0){
          console.log('no hay datos');
        }
        setTimeout(() => {
          this.candLoad = false;
        }, 1500);
      });
    } else if(this.tipoBusqueda == 'f2'){
      let body = {
        strackMaps: 'strackMapF3',
        usr_crea: this.id_usuario
      };
      this.provider.cargarOrdenes(body, 'db_cargar_ordenes.php').subscribe(data => {
        this.dataResponse = data.result;
        console.log(this.dataResponse);
        if(this.dataResponse.length == 0){
          console.log('no hay datos');
        }
        setTimeout(() => {
          this.candLoad = false;
        }, 1500);
      });
    } else if (this.tipoBusqueda == 'f3'){
      let body = {
        strackMaps: 'strackMapF4',
        usr_crea: this.id_usuario
      };
      this.provider.cargarOrdenes(body, 'db_cargar_ordenes.php').subscribe(data => {
        this.dataResponse = data.result;
        if(this.dataResponse.length == 0){
          console.log('no hay datos');
        }
        console.log(this.dataResponse);
        setTimeout(() => {
          this.candLoad = false;
        }, 1500);
      });
    } else if (this.tipoBusqueda == 'f4'){
      let body = {
        strackMaps: 'strackMapF5',
        usr_crea: this.id_usuario
      };
      this.provider.cargarOrdenes(body, 'db_cargar_ordenes.php').subscribe(data => {
        this.dataResponse = data.result;
        console.log(this.dataResponse);
        if(this.dataResponse.length == 0){
          console.log('no hay datos');
        }
        setTimeout(() => {
          this.candLoad = false;
        }, 1500);
      });
    } else if (this.tipoBusqueda == 'f5') {
      let body = {
        strackMaps: 'strackMapF7',
        usr_crea: this.id_usuario
      };
      this.provider.cargarOrdenes(body, 'db_cargar_ordenes.php').subscribe(data => {
        this.dataResponse = data.result;
        console.log(this.dataResponse);
        if(this.dataResponse.length == 0){
          console.log('no hay datos');
        }
        setTimeout(() => {
          this.candLoad = false;
        }, 1500);
      });
    } else if (this.tipoBusqueda == 'f6'){
      let body = {
        strackMaps: 'strackMapF6',
        usr_crea: this.id_usuario
      };
      this.provider.cargarOrdenes(body, 'db_cargar_ordenes.php').subscribe(data => {
        this.dataResponse = data.result;
        console.log(this.dataResponse);
        if(this.dataResponse.length == 0){
          console.log('no hay datos');
        }
        setTimeout(() => {
          this.candLoad = false;
        }, 1500);
      });
    }
  }
}
