// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apicargarServicios: 'http://supertrack-net.ddns.net:50371/v1/server_strackMaps/api/db_cargar_servicios.php/',
  apicargarAditamientos: 'http://supertrack-net.ddns.net:50371/v1/server_strackMaps/api/db_cargar_sensores_aditamientos.php/',
  apiiniciarSesion: 'http://supertrack-net.ddns.net:50371/v1/server_strackMaps/api/db_iniciar_sesion.php/',
  apibuscarUnidad: 'http://supertrack-net.ddns.net:50371/v1/server_strackMaps/api/db_buscar_unidad.php/',
  apicargarSensoresCaja: 'http://supertrack-net.ddns.net:50371/v1/server_strackMaps/api/db_cargar_sensores_remolque.php/',
  apiregistrarOrden: 'http://supertrack-net.ddns.net:50371/v1/server_strackMaps/api/db_registrar_ordenes.php/',
  apicargarOrdenes: 'http://supertrack-net.ddns.net:50371/v1/server_strackMaps/api/db_cargar_ordenes.php/',
  apiactualizarFoto: 'http://supertrack-net.ddns.net:50371/v1/server_strackMaps/api/db_actualizar_foto_perfil.php/',
  apicargarDetalle: 'http://supertrack-net.ddns.net:50371/v1/server_strackMaps/api/db_cargar_detalle.php/',
  apicargarBases: 'http://supertrack-net.ddns.net:50371/v1/server_strackMaps/api/db_cargar_bases.php/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
