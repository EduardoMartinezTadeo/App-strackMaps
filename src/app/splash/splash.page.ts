/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  perfiles: any;
  status: string;
  constructor(
    private router: Router,
    private storage: StorageService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.perfiles = this.storage.perfil;
      if (this.perfiles == undefined){
        this.router.navigateByUrl('/iniciar-sesion');
      } else {
        this.status = this.perfiles.status;
        if(this.status == 'tecnico'){
          this.router.navigateByUrl('/menu-tabs');
        }
      }
    }, 1750);
  }
}
