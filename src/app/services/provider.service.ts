/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apicargarServiciosURL = environment.apicargarServicios;
const apicargarAditamientosURL = environment.apicargarAditamientos;

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

}
