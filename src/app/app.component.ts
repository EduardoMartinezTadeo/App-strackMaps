/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
import { StatusBar } from '@ionic-native/status-bar/ngx';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

export enum ConnectionStatus {
  Online,
  Offline
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    public network: Network,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#002e6d');
      this.network.onDisconnect().subscribe(() => {
        this.initializeNetworkEvents();
      });
      this.network.onConnect().subscribe(() => {
        setTimeout(() => {
          this.initializeNetworkEvents();
        }, 2000);
      });
      this.initializeNetworkEvents();
      let status =  this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
      this.status.next(status);
    });
  }

  public initializeNetworkEvents() {

    this.network.onDisconnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Online) {
        this.navCtrl.navigateRoot('/offline');
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });

    this.network.onConnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Offline) {
        this.navCtrl.navigateRoot('/splash');
        this.updateNetworkStatus(ConnectionStatus.Online);
      }
    });
  }

  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);

    let connection = status == ConnectionStatus.Offline ? 'desconectado' : 'en línea';
    let toast = this.toastController.create({
      message: `Ahora estas ${connection}`,
      duration: 3000,
      position: 'bottom',
      color: 'red',
      buttons: [
        {
          side: 'end',
          icon: 'wifi'
        }
      ]
    });
    toast.then(toast => toast.present());
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }
}
