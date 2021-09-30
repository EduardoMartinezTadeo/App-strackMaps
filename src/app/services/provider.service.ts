/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apicargarServiciosURL = environment.apicargarServicios;
const apicargarAditamientosURL = environment.apicargarAditamientos;
const apicargarSensoresCajaURL = environment.apicargarSensoresCaja;
const apicargarOrdenesURL = environment.apicargarOrdenes;
const apiactualizarFotoPerfilURL = environment.apiactualizarFoto;
const apiregistrarOrdenesURL = environment.apiregistrarOrden;
const apicargarDetalleURL = environment.apicargarDetalle;

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  server: string = 'http://supertrack-net.ddns.net:50371/v1/server_strackMaps/api/';

  constructor(
    public http: HttpClient
  ) { }

  cargarServicios(body, file) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });

    return this.http.post<any>(apicargarServiciosURL + file, body, { headers });
  }

  cargarAditamientos(body, file) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });

    return this.http.post<any>(apicargarAditamientosURL + file, body, { headers });
  }

  cargarSensoresCaja(body, file) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });

    return this.http.post<any>(apicargarSensoresCajaURL + file, body, { headers });
  }

  cargarOrdenes(body, file) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });

    return this.http.post<any>(apicargarOrdenesURL + file, body, { headers });
  }


  actualizarFotoPerfil(body, file) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });

    return this.http.post<any>(apiactualizarFotoPerfilURL + file, body, { headers });
  }

  registrarOrdenes(body, file) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });

    return this.http.post<any>(apiregistrarOrdenesURL + file, body, { headers });
  }

  cargarDetalle(body, file) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });

    return this.http.post<any>(apicargarDetalleURL + file, body, { headers });
  }

}
