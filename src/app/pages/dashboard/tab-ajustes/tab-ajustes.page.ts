/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable eqeqeq */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Brightness } from '@ionic-native/brightness/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-tab-ajustes',
  templateUrl: './tab-ajustes.page.html',
  styleUrls: ['./tab-ajustes.page.scss'],
})
export class TabAjustesPage implements OnInit {
  existingScreenOrientation: string;
  currentPosition;
  height;
  minimumThreshold;
  startPosition;
  darkValue: any;
  btn1: boolean = true;
  btn2: boolean = false;
  constructor(
    private storage: StorageService,
    private toastController: ToastController,
    private brightness: Brightness,
    private so: ScreenOrientation,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navController: NavController
  ) {
    this.existingScreenOrientation = this.so.type;
    // find out changes in orientation
    this.so.onChange().subscribe(
      () => {
        this.existingScreenOrientation = this.so.type;
      }
    );
  }

  ngOnInit() {
    this.close();
    this.darkValue = this.darkBoolean;
  }

  themeNote: any;
  setTheme(ev) {
    if (ev.detail.checked == true) {
      this.storage.setAppTheme(ev.detail.checked);
      this.themeNote = 'Modo oscuro activado';
      this.toastTheme(this.themeNote);
    } else {
      this.storage.setAppTheme(ev.detail.checked);
      this.themeNote = 'Modo oscuro desactivado';
      this.toastThemeLight(this.themeNote);
    }
  }

  open() {
    (<HTMLStyleElement>document.querySelector(".bottomSheets")).style.bottom = "0px";
    (<HTMLStyleElement>document.querySelector(".bgs")).style.display = "block";
  }

  close() {
    this.currentPosition = 0;
    this.startPosition = 0;
    (<HTMLStyleElement>document.querySelector(".bottomSheets")).style.bottom = "-1000px";
    (<HTMLStyleElement>document.querySelector(".bottomSheets")).style.transform = "translate3d(0px,0px,0px)";
    (<HTMLStyleElement>document.querySelector(".bgs")).style.display = "none";
  }

  touchMove(evt: TouchEvent) {
    if (this.startPosition == 0) {
      this.startPosition = evt.touches[0].clientY;
    }

    this.height = document.querySelector(".bottomSheets").clientHeight;

    var y = evt.touches[0].clientY;

    this.currentPosition = y - this.startPosition;

    if (this.currentPosition > 0 && this.startPosition > 0) {
      (<HTMLStyleElement>document.querySelector(".bottomSheets")).style.transform = "translate3d(0px," + this.currentPosition + "px,0px)";
    }
  }

  touchEnd() {
    this.minimumThreshold = this.height - 150;

    if (this.currentPosition < this.minimumThreshold) {
      (<HTMLStyleElement>document.querySelector(".bottomSheets")).style.transform = "translate3d(0px,0px,0px)";
    }
    else {
      this.close();
    }
  }

  get darkBoolean() {
    return this.storage.sharedDarkValue;
  }

  async toastTheme(themeNote) {
    const toast = await this.toastController.create({
      message: this.themeNote,
      duration: 2000,
      position: 'bottom',
      color: 'red',
      cssClass: 'toast-style',
      buttons: [
        {
          side: 'end',
          icon: 'moon'
        }
      ]
    });
    toast.present();
  }

  async toastThemeLight(themeNote) {
    const toast = await this.toastController.create({
      message: this.themeNote,
      duration: 2000,
      position: 'bottom',
      color: 'red',
      cssClass: 'toast-style',
      buttons: [
        {
          side: 'end',
          icon: 'sunny-outline'
        }
      ]
    });
    toast.present();
  }

  rangeval: number = 100;
  setBrightness() {
    this.brightness.setBrightness(this.rangeval / 100).then(
      () => { },
      (error) => {
        console.log(error);
      }
    );
  }



  lockToPortrait() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.btn1 = false;
    this.btn2 = true;
  }

  // Lock to landscape
  lockToLandscape() {
    this.so.lock(this.so.ORIENTATIONS.LANDSCAPE);
    this.btn2 = false;
    this.btn1 = true;
  }

  eliminarData: any;
  cerrarSesion(event) {
    this.eliminarData = event.detail;
    if (this.eliminarData.checked == true) {
      this.confirarCerrarSesion();
    }
  }

  responseData: any;
  async confirarCerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Esta seguro que desea cerrar su sesión?',
      mode: 'ios',
      animated: true,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.eliminarData.checked == false;
          },
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            this.cerrandoSesion();
          },
        },
      ],
    });

    await alert.present();
  }

  async cerrandoSesion() {
    const loading = await this.loadingController.create({
      message: 'Espere un momento...',
      duration: 2000,
      spinner: 'bubbles',
      cssClass: 'alert-style',
    });
    await loading.present();
    setTimeout(() => {
      this.navController.navigateRoot('/iniciar-sesion');
    }, 1500);
  }
}
