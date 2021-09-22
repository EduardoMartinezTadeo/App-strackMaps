/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  sharedDarkValue: any;
  private _storage: Storage | null = null;
  constructor(
    private storage: Storage
  ) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    this.cargarPerfil();
    setTimeout(() => {
      this.themeSystem();
    }, 1500);
  }

  theme: any;
  themeSystem() {
    this.storage.get('selected-app-theme').then((value) => {
      this.setAppTheme(value);
    });
  }

  setAppTheme(dark) {
    this.sharedDarkValue = dark;
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    this.storage.set('selected-app-theme', dark);
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public remove(key: string){
    this._storage?.remove(key);
  }

  perfil: any;
  cargarPerfil(){
    this.storage.get('perfil').then(perfil => {
      this.perfil = perfil;
    });
  }
}
