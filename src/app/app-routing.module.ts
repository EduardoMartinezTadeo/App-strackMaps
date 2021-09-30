import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./pages/dashboard/iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)
  },
  {
    path: 'menu-tabs',
    loadChildren: () => import('./pages/dashboard/menu-tabs/menu-tabs.module').then( m => m.MenuTabsPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'offline',
    loadChildren: () => import('./offline/offline.module').then( m => m.OfflinePageModule)
  },
  {
    path: 'tab-inicio',
    loadChildren: () => import('./pages/dashboard/tab-inicio/tab-inicio.module').then( m => m.TabInicioPageModule)
  },
  {
    path: 'modal-nueva-orden',
    loadChildren: () => import('./modals/modal-nueva-orden/modal-nueva-orden.module').then( m => m.ModalNuevaOrdenPageModule)
  },
  {
    path: 'modal-orden-pendiente',
    loadChildren: () => import('./modals/modal-orden-pendiente/modal-orden-pendiente.module').then( m => m.ModalOrdenPendientePageModule)
  },
  {
    path: 'modal-detalle',
    loadChildren: () => import('./modals/modal-detalle/modal-detalle.module').then( m => m.ModalDetallePageModule)
  },
  {
    path: 'modal-orden',
    loadChildren: () => import('./modals/modal-orden/modal-orden.module').then( m => m.ModalOrdenPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
